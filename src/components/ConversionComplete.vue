<template>
  <div class="complete-section">
    <div class="success-icon">
      <vue3-lottie
        :animation-data="successAnimation"
        :height="80"
        :width="80"
        :loop="false"
        :auto-play="true"
      />
      <h2>转换完成！</h2>
    </div>
    <p class="output-path">输出路径: {{ outputDir }}</p>
    <div class="action-buttons">
      <button class="neo-button primary" @click="handleOpenInFinder">
        <span class="button-content">
          <i class="neo-icon">📂</i>
          在访达中查看
        </span>
        <div class="button-glow"></div>
      </button>
      <button class="neo-button" @click="handleReset">
        <span class="button-content">
          <i class="neo-icon">↺</i>
          转换新视频
        </span>
        <div class="button-glow"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import successAnimationData from '../assets/success-animation.json';

const props = defineProps({
  outputDir: String,
  onReset: Function
});

const successAnimation = ref(successAnimationData);

const handleOpenInFinder = () => {
  fetch(`/output/open?path=${encodeURIComponent(props.outputDir)}`, {
    method: 'POST',
  });
};

const handleReset = () => {
  props.onReset?.();
};
</script>

<style lang="scss" scoped>
.complete-section {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    margin: 0;
    background: linear-gradient(135deg, #67c23a 0%, #409EFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.output-path {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2rem;
  padding: 1rem;
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-family: 'SF Mono', monospace;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.neo-button {
  position: relative;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  
  .button-content {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }
  
  .button-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(40, 40, 40, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    
    .button-glow {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &.primary {
    background: linear-gradient(135deg, rgba(103, 194, 58, 0.2) 0%, rgba(64, 158, 255, 0.2) 100%);
    border-color: rgba(103, 194, 58, 0.4);
    
    &:hover {
      background: linear-gradient(135deg, rgba(103, 194, 58, 0.3) 0%, rgba(64, 158, 255, 0.3) 100%);
      border-color: rgba(103, 194, 58, 0.6);
    }
  }
  
  .neo-icon {
    font-style: normal;
    font-size: 1.2em;
  }
}

@media (max-width: 640px) {
  .success-icon {
    flex-direction: column;
    gap: 0.5rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .action-buttons {
    flex-direction: column;
  }
  
  .output-path {
    font-size: 0.8rem;
    word-break: break-all;
  }
}
</style> 