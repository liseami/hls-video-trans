const express = require('express');
const multer = require('multer');
const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 配置 multer 以处理大文件
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1024 * 1024 * 1024 // 1GB
    }
});

app.use(express.json());
app.use('/output', express.static('output'));

// 存储当前运行的进程
let currentProcess = null;

// 确保必要的目录存在
['uploads', 'output'].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

// WebSocket连接处理
let activeConnections = new Set();

wss.on('connection', (ws) => {
    activeConnections.add(ws);
    console.log('WebSocket 客户端已连接');

    ws.on('close', () => {
        activeConnections.delete(ws);
        console.log('WebSocket 客户端已断开');
    });

    // 处理来自客户端的消息
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'abort' && currentProcess) {
                console.log('收到终止请求');
                currentProcess.kill('SIGTERM');
                broadcastMessage({
                    type: 'log',
                    level: 'warning',
                    message: '任务已被用户终止'
                });
                currentProcess = null;
            }
        } catch (e) {
            console.error('处理WebSocket消息时出错:', e);
        }
    });
});

// 广播消息
function broadcastMessage(data) {
    activeConnections.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
        }
    });
}

// 创建进度管理类
class ConversionProgress {
    constructor(totalDuration) {
        this.totalDuration = totalDuration;
        this.currentResolution = 0;
        this.resolutions = ['720p', '1080p', '2160p'];
        this.lastProgress = 0;
        this.currentStage = 1;
    }

    // 检测分辨率变化
    checkResolutionChange(output) {
        const resolutionMatch = output.match(/Processing (\d+)p\.\.\./);
        if (resolutionMatch) {
            const resolution = resolutionMatch[1] + 'p';
            const resolutionIndex = this.resolutions.indexOf(resolution);
            if (resolutionIndex !== -1 && resolutionIndex !== this.currentResolution) {
                this.currentResolution = resolutionIndex;
                this.currentStage = resolutionIndex + 1;
                return true;
            }
        }
        return false;
    }

    // 计算进度
    calculateProgress(currentTime) {
        const resolutionProgress = Math.min(Math.round((currentTime / this.totalDuration) * 100), 99);
        const baseProgress = this.currentResolution * 33;
        const stageProgress = Math.round(resolutionProgress / 3);
        return Math.min(baseProgress + stageProgress, 99);
    }

    // 获取当前状态
    getStatus(currentTime) {
        const progress = this.calculateProgress(currentTime);
        if (progress <= this.lastProgress) {
            return null;
        }

        this.lastProgress = progress;
        return {
            type: 'progress',
            progress,
            resolution: this.resolutions[this.currentResolution],
            stage: `正在处理 ${this.resolutions[this.currentResolution]}`,
            currentStage: this.currentStage,
            totalStages: this.resolutions.length,
            resolutionProgress: Math.min(Math.round((currentTime / this.totalDuration) * 100), 99)
        };
    }
}

app.post('/upload', upload.single('video'), async (req, res) => {
    console.log('收到上传请求');

    if (!req.file) {
        console.error('没有接收到文件');
        return res.status(400).json({ error: '没有上传文件' });
    }

    if (!req.query.folderName) {
        console.error('没有指定输出文件夹名称');
        return res.status(400).json({ error: '请指定输出文件夹名称' });
    }

    console.log('文件信息:', {
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        folderName: req.query.folderName
    });

    const inputPath = req.file.path;
    const outputDir = path.join(__dirname, 'output');
    const folderName = req.query.folderName;
    const specificOutputDir = path.join(outputDir, folderName);

    // 验证文件夹名称的合法性
    if (!/^[a-zA-Z0-9-_]+$/.test(folderName)) {
        console.error('非法的文件夹名称:', folderName);
        if (fs.existsSync(inputPath)) {
            fs.unlinkSync(inputPath);
        }
        return res.status(400).json({ error: '文件夹名称只能包含字母、数字、下划线和横线' });
    }

    try {
        // 检查tool.bash是否存在且可执行
        const toolPath = path.join(__dirname, 'tool.bash');
        if (!fs.existsSync(toolPath)) {
            throw new Error('转换脚本不存在');
        }

        // 确保脚本有执行权限
        try {
            fs.accessSync(toolPath, fs.constants.X_OK);
        } catch (error) {
            console.error('脚本没有执行权限，尝试添加执行权限');
            await new Promise((resolve, reject) => {
                exec(`chmod +x "${toolPath}"`, (error) => {
                    if (error) reject(error);
                    else resolve();
                });
            });
        }

        // 如果指定的输出目录已存在，先删除它
        if (fs.existsSync(specificOutputDir)) {
            console.log(`删除已存在的输出目录: ${specificOutputDir}`);
            fs.rmSync(specificOutputDir, { recursive: true, force: true });
        }

        broadcastMessage({
            type: 'log',
            level: 'info',
            message: '开始分析视频文件...'
        });

        // 使用Promise包装ffprobe调用
        const videoInfo = await new Promise((resolve, reject) => {
            exec(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,bit_rate,codec_name -of json "${inputPath}"`, (error, stdout) => {
                if (error) {
                    console.error('ffprobe 错误:', error);
                    reject(error);
                    return;
                }
                try {
                    const info = JSON.parse(stdout);
                    resolve(info);
                } catch (e) {
                    reject(new Error('解析视频信息失败'));
                }
            });
        });

        const stream = videoInfo.streams[0];
        if (!stream) {
            throw new Error('无法读取视频流信息');
        }

        const totalDuration = parseFloat(stream.duration);
        const originalResolution = `${stream.width}x${stream.height}`;
        const codec = stream.codec_name;
        const bitrate = stream.bit_rate ? Math.round(stream.bit_rate / 1024) + ' Kbps' : '未知';

        broadcastMessage({
            type: 'log',
            level: 'info',
            message: `视频信息：
            - 时长：${Math.round(totalDuration)}秒
            - 原始分辨率：${originalResolution}
            - 编码格式：${codec}
            - 码率：${bitrate}`
        });

        const progressTracker = new ConversionProgress(totalDuration);

        console.log('开始转换进程');
        currentProcess = spawn('bash', ['tool.bash', inputPath, outputDir]);

        broadcastMessage({
            type: 'log',
            level: 'info',
            message: '开始转换视频...'
        });

        // 处理脚本输出
        currentProcess.stdout.on('data', (data) => {
            const message = data.toString().trim();
            if (message) {
                console.log('转换输出:', message);
                broadcastMessage({
                    type: 'log',
                    level: 'info',
                    message: message
                });

                // 检查分辨率变化
                if (progressTracker.checkResolutionChange(message)) {
                    broadcastMessage({
                        type: 'log',
                        level: 'info',
                        message: `开始处理${progressTracker.resolutions[progressTracker.currentResolution]}分辨率...`
                    });
                }
            }
        });

        // 处理脚本错误输出
        currentProcess.stderr.on('data', (data) => {
            const output = data.toString();
            console.log('ffmpeg输出:', output);

            // 检查分辨率变化
            if (progressTracker.checkResolutionChange(output)) {
                broadcastMessage({
                    type: 'log',
                    level: 'info',
                    message: `开始处理${progressTracker.resolutions[progressTracker.currentResolution]}分辨率...`
                });
            }

            // 解析转换进度
            const timeMatch = output.match(/time=(\d+):(\d+):(\d+.\d+)/);
            if (timeMatch) {
                const [_, hours, minutes, seconds] = timeMatch;
                const currentTime = parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);

                const status = progressTracker.getStatus(currentTime);
                if (status) {
                    console.log(`进度更新: ${status.progress}%, 当前分辨率: ${status.resolution}, 分辨率进度: ${status.resolutionProgress}%, 当前时间: ${currentTime}s, 总时长: ${totalDuration}s`);
                    broadcastMessage(status);
                }
            }

            // 解析转换速度
            const speedMatch = output.match(/speed=\s*(\d+\.\d+)x/);
            if (speedMatch) {
                const speed = parseFloat(speedMatch[1]);
                broadcastMessage({
                    type: 'speed',
                    speed: speed
                });
            }

            // 检查是否包含错误信息
            if (output.toLowerCase().includes('error') && !output.toLowerCase().includes('error concealment')) {
                console.error('转换过程出错:', output);
                broadcastMessage({
                    type: 'log',
                    level: 'error',
                    message: `转换过程出错: ${output.trim()}`
                });
            }
        });

        // 处理脚本完成
        currentProcess.on('close', (code) => {
            console.log(`转换进程结束，退出码: ${code}`);

            try {
                // 删除临时上传文件
                fs.unlinkSync(inputPath);
                console.log('临时文件已删除:', inputPath);

                if (code !== 0) {
                    throw new Error(`转换失败，错误代码: ${code}`);
                }

                // 获取最新创建的输出目录
                const files = fs.readdirSync(outputDir);
                const lastDir = files[files.length - 1];
                let outputPath = path.join(outputDir, lastDir);

                // 如果输出目录名称与请求的不同，重命名它
                if (lastDir !== folderName) {
                    const newPath = path.join(outputDir, folderName);
                    fs.renameSync(outputPath, newPath);
                    console.log(`出目录已重命名: ${lastDir} -> ${folderName}`);
                    outputPath = newPath;
                }

                broadcastMessage({
                    type: 'log',
                    level: 'success',
                    message: '视频转换完成！'
                });

                broadcastMessage({
                    type: 'progress',
                    progress: 100,
                    resolution: '完成',
                    stage: '转换完成',
                    totalStages: progressTracker.resolutions.length
                });

                currentProcess = null;

                res.json({
                    success: true,
                    message: '转换成功',
                    outputDir: outputPath
                });
            } catch (error) {
                console.error('处理完成时出错:', error);
                broadcastMessage({
                    type: 'log',
                    level: 'error',
                    message: error.message
                });
                res.status(500).json({ error: error.message });
            }
        });

        // 处理脚本错误
        currentProcess.on('error', (err) => {
            console.error('转换进程错误:', err);
            broadcastMessage({
                type: 'log',
                level: 'error',
                message: `转换进程错误: ${err.message}`
            });
            currentProcess = null;
        });

    } catch (error) {
        console.error('处理上传时出错:', error);
        // 清理临时文件
        if (fs.existsSync(inputPath)) {
            fs.unlinkSync(inputPath);
        }
        res.status(500).json({ error: error.message });
    }
});

// 在Finder中打开文件夹
app.post('/output/open', (req, res) => {
    const folderPath = req.query.path;
    if (!folderPath) {
        return res.status(400).json({ error: '未指定路径' });
    }

    exec(`open "${folderPath}"`, (error) => {
        if (error) {
            console.error('打开文件夹失败:', error);
            return res.status(500).json({ error: '无法打开文件夹' });
        }
        res.json({ success: true });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 