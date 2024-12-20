<template>
  <div class="app-container">
    <div class="content-wrapper">
      <div 
        class="main-card"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <header class="app-header">
          <h1 v-motion-slide-bottom>流媒体HLS视频转换器</h1>
          <p class="subtitle" v-motion-slide-bottom>HLS · 多分辨率 · 流媒体</p>
        </header>

        <el-tabs v-model="activeTab" class="neo-tabs">
          <el-tab-pane label="视频转换" name="converter">
            <transition-group 
              name="fade-slide" 
              appear
            >
              <VideoUploader
                v-if="!isConverting && !outputDir"
                key="upload"
                @upload-start="handleUploadStart"
                @upload-success="handleUploadSuccess"
                @upload-error="handleUploadError"
              />

              <ConversionProgress
                v-if="isConverting"
                key="converting"
                v-bind="conversionState"
                @abort="handleAbort"
              />

              <ConversionComplete
                v-if="outputDir"
                key="complete"
                :output-dir="outputDir"
                @reset="resetForm"
              />
            </transition-group>
          </el-tab-pane>
          
          <el-tab-pane label="使用教程" name="tutorial">
            <div class="tutorial-content">
              <div class="tutorial-grid">
                <section class="tutorial-section">
                  <div class="section-header">
                    <span class="mono-label">01</span>
                    <h2>HLS流媒体</h2>
                  </div>
                  <div class="tech-grid">
                    <div class="tech-box">
                      <span class="tech-icon">⚡️</span>
                      <span>自适应码率切换</span>
                    </div>
                    <div class="tech-box">
                      <span class="tech-icon">🌐</span>
                      <span>全平台兼容播放</span>
                    </div>
                    <div class="tech-box">
                      <span class="tech-icon">📦</span>
                      <span>智能分片传输</span>
                    </div>
                    <div class="tech-box">
                      <span class="tech-icon">💡</span>
                      <span>按需加载资源</span>
                    </div>
                  </div>
                </section>

                <section class="tutorial-section">
                  <div class="section-header">
                    <span class="mono-label">02</span>
                    <h2>环境配置（运行前需要安装ffmpeg）</h2>
                  </div>
                  <div class="install-grid">
                    <div class="os-box">
                      <div class="os-label">MacOS</div>
                      <code>brew install ffmpeg</code>
                    </div>
                    <div class="os-box">
                      <div class="os-label">Windows</div>
                      <code>scoop install ffmpeg</code>
                    </div>
                    <div class="os-box">
                      <div class="os-label">Linux</div>
                      <code>apt-get install ffmpeg</code>
                    </div>
                  </div>
                  <div class="spec-table">
                    
                  </div>
                </section>

                <section class="tutorial-section">
                  <div class="section-header">
                    <span class="mono-label">03</span>
                    <h2>集成方式</h2>
                  </div>
                  <div class="code-tabs">
                    <div class="code-tab">
                      <pre><code>// Modern Web Component
import 'hls-video-element';

&lt;hls-video 
  controls 
  src="video.m3u8">
&lt;/hls-video></code></pre>
                    </div>
                    <div class="code-tab">
                      <pre><code>// Native JavaScript
import Hls from 'hls.js';

const hls = new Hls();
hls.loadSource('video.m3u8');
hls.attachMedia(video);</code></pre>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <footer class="neo-footer">
        <div class="footer-content">
          <a href="https://me.revome.cn" target="_blank" class="author-link">
            <span class="author-name">赵纯想</span>
            <span class="author-title">全栈工程师 / 独立开发者</span>
          </a>
          <div class="divider"></div>
          <p class="footer-quote">"创造美好的东西，供人使用"</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useMotion } from '@vueuse/motion';
import VideoUploader from './components/VideoUploader.vue';
import ConversionProgress from './components/ConversionProgress.vue';
import ConversionComplete from './components/ConversionComplete.vue';
import { useWebSocket } from './composables/useWebSocket';

const activeTab = ref('converter');
const isConverting = ref(false);
const outputDir = ref('');
const conversionState = useWebSocket();

const handleUploadStart = () => {
  isConverting.value = true;
  conversionState.progress.value = 0;
  conversionState.logs.value = [];
};

const handleUploadSuccess = (response) => {
  isConverting.value = false;
  conversionState.progress.value = 100;
  outputDir.value = response.outputDir;
  ElMessage.success('视频转换成功！');
};

const handleUploadError = (error) => {
  isConverting.value = false;
  conversionState.progress.value = 0;
  
  let errorMessage = '视频转换失败，请重试';
  try {
    const response = JSON.parse(error.message);
    if (response.error) {
      errorMessage = response.error;
    }
  } catch (e) {
    // 如果解析失败，使用默认错误消息
  }
  
  ElMessage.error(errorMessage);
};

const handleAbort = () => {
  conversionState.abortConversion();
};

const resetForm = () => {
  outputDir.value = '';
  isConverting.value = false;
  conversionState.progress.value = 0;
  conversionState.currentResolution.value = '';
  conversionState.stage.value = '';
  conversionState.currentStage.value = 0;
  conversionState.resolutionProgress.value = 0;
  conversionState.speed.value = 0;
  conversionState.logs.value = [];
};
</script>

<style lang="scss">
@import './styles/app.scss';

.neo-footer {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(35, 35, 35, 0.7);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .author-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }

    .author-name {
      font-size: 1.2rem;
      font-weight: 600;
      background: linear-gradient(135deg, #fff 0%, #888 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .author-title {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .divider {
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
  }

  .footer-quote {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
    margin: 0;
  }
}

@media (max-width: 640px) {
  .neo-footer {
    margin-top: 1.5rem;
    padding: 1rem;

    .author-name {
      font-size: 1.1rem;
    }

    .author-title,
    .footer-quote {
      font-size: 0.85rem;
    }
  }
}

.neo-tabs {
  .el-tabs__header {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .el-tabs__nav-wrap::after {
    display: none;
  }

  .el-tabs__nav {
    display: flex;
    gap: 2rem;
  }

  .el-tabs__item {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.95rem;
    padding: 0.5rem 0;
    height: auto;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;

    &.is-active {
      color: #fff;
      border-bottom-color: #fff;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .el-tabs__active-bar {
    display: none;
  }
}

.tutorial-content {
  .tutorial-grid {
    display: grid;
    gap: 1.5rem;
  }

  .tutorial-section {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 1.25rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;

    .mono-label {
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }

    h2 {
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;

    .tech-box {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 6px;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .tech-icon {
        font-size: 1rem;
        opacity: 0.8;
      }

      span:last-child {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .install-grid {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .os-box {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 6px;
      padding: 0.75rem;

      .os-label {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 0.4rem;
        font-family: 'Fira Code', monospace;
      }

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .spec-table {
    display: grid;
    gap: 0.5rem;
    font-size: 0.8rem;

    .spec-row {
      display: grid;
      grid-template-columns: 80px 1fr;
      padding: 0.4rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);

      &:last-child {
        border-bottom: none;
      }

      span:first-child {
        color: rgba(255, 255, 255, 0.4);
      }

      span:last-child {
        color: rgba(255, 255, 255, 0.9);
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .code-tabs {
    display: grid;
    gap: 0.75rem;

    .code-tab {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 6px;
      padding: 0.75rem;

      pre {
        margin: 0;
        
        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.4;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .tutorial-content {
    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .section-header {
      .mono-label {
        font-size: 0.75rem;
      }

      h2 {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
