# 视频转换工具

这是一个基于网页的视频转换工具，可以将视频转换为HLS格式，支持多种分辨率输出。

## 系统要求

- Node.js 14+
- ffmpeg
- Mac OS (M1芯片支持)

## 安装

1. 确保已安装 ffmpeg：
```bash
brew install ffmpeg
```

2. 安装项目依赖：
```bash
npm install
```

## 运行

执行以下命令启动应用：

```bash
chmod +x start.sh
./start.sh
```

或者分别启动前端和后端：

```bash
# 终端1：启动后端服务器
node server.js

# 终端2：启动前端开发服务器
npm run dev
```

## 使用方法

1. 打开浏览器访问 http://localhost:5173
2. 将视频文件拖拽到上传区域或点击选择文件
3. 等待转换完成
4. 点击"在 Finder 中查看"按钮查看转换后的文件

## 功能特点

- 支持拖拽上传
- 自动转换为HLS格式
- 支持多种分辨率输出（720p、1080p、2160p）
- 转换完成后可直接在Finder中打开文件夹
- 美观的用户界面
- 实时转换进度显示 