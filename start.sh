#!/bin/bash

# 安装依赖
npm install

# 启动后端服务器
node server.js &

# 启动前端开发服务器
npm run dev 