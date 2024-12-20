# HLS视频转换器

一个优雅的流媒体视频转换工具，支持将普通视频转换为HLS（HTTP Live Streaming）格式。

## ✨ 特性

- 🚀 自适应码率切换
- 🌐 全平台兼容播放
- 📦 智能分片传输
- 💡 按需加载资源
- 🎯 多分辨率支持
- ⚡️ 实时转码进度

## 🔧 环境要求

### FFmpeg 安装

本工具基于FFmpeg进行视频转码，使用前请确保已安装FFmpeg：

**MacOS**
```bash
brew install ffmpeg
```

**Windows**
```bash
scoop install ffmpeg
```

**Linux**
```bash
apt-get install ffmpeg
```

### Node.js 环境

- Node.js 16+
- npm 或 yarn

## 🚀 快速开始

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 运行脚本（可以查看和修改脚本）
```bash
./start.sh 
```

## 💻 使用方法

1. 打开应用后，选择要转换的视频文件
2. 上传完成后，系统会自动开始转换
3. 转换过程中可以实时查看进度
4. 转换完成后，可以获取生成的HLS文件

## 🔌 在网页中使用生成的HLS视频

### 方式一：使用Web Component（推荐）

```javascript
// 使用hls-video-element
import 'hls-video-element';

<hls-video 
  controls 
  src="video.m3u8">
</hls-video>
```

### 方式二：使用原生JavaScript

```javascript
// 使用hls.js
import Hls from 'hls.js';

const hls = new Hls();
hls.loadSource('video.m3u8');
hls.attachMedia(video);
```

## 📝 技术规格

- 支持分辨率：240p 到 4K
- 视频编码：H.264
- 音频编码：AAC
- 切片时长：6秒
- 输出格式：m3u8 + ts文件

## 🤝 贡献

欢迎提交问题和改进建议！

## 📄 许可证

[MIT License](LICENSE)

## 👨‍💻 作者

赵纯想 - 全栈工程师 / 独立开发者

- 个人主页：[https://me.revome.cn](https://me.revome.cn)
- "创造美好的东西，供人使用" 