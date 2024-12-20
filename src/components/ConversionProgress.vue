<template>
  <div class="converting-section">
    <div class="progress-display">
      <svg class="progress-ring" :width="200" :height="200">
        <circle
          class="progress-ring-circle-bg"
          :stroke-width="8"
          fill="transparent"
          r="90"
          cx="100"
          cy="100"
        />
        <circle
          class="progress-ring-circle"
          :stroke-width="8"
          fill="transparent"
          r="90"
          cx="100"
          cy="100"
          :style="{ 
            strokeDasharray: `${2 * Math.PI * 90}`,
            strokeDashoffset: `${2 * Math.PI * 90 * (1 - progressValue / 100)}`
          }"
        />
        <text x="100" y="95" class="progress-text">{{ progressValue }}%</text>
        <text x="100" y="115" class="progress-stage">{{ currentResolutionValue }}</text>
      </svg>

      <div class="stage-info">
        <div class="stage-progress">
          <span class="stage-label">阶段 {{ currentStageValue }}/{{ totalStagesValue }}</span>
          <el-progress 
            :percentage="resolutionProgressValue" 
            :stroke-width="4"
            :text-inside="true"
            class="modern-progress"
          />
        </div>
        <p class="stage-text">{{ stageValue }}</p>
        <p v-if="speedValue" class="speed-info">速度: {{ speedValue.toFixed(1) }}x</p>
      </div>

      <div class="log-section">
        <div class="log-header">
          <h4>处理日志</h4>
          <div class="neo-switch" :class="{ active: autoScroll }" @click="autoScroll = !autoScroll">
            <div class="switch-track">
              <div class="switch-thumb"></div>
            </div>
            <span class="switch-text">自动滚动</span>
          </div>
        </div>
        <div 
          ref="logContent"
          class="log-content custom-scrollbar"
          @scroll="handleLogScroll"
        >
          <transition-group name="fade-up">
            <div
              v-for="(log, index) in logsValue"
              :key="index"
              class="log-item"
              :class="[`log-${log.level}`, { 'new-log': index === logsValue.length - 1 }]"
            >
              <span class="log-time">{{ log.time }}</span>
              <span class="log-message" v-html="formatMessage(log.message)"></span>
            </div>
          </transition-group>
        </div>
      </div>

      <button 
        class="neo-button"
        @click="handleAbort"
      >
        <span class="button-content">
          <i class="neo-icon">✕</i>
          终止转换
        </span>
        <div class="button-glow"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import { CircleClose } from '@element-plus/icons-vue';

const props = defineProps({
  progress: { type: Object, required: true },
  currentResolution: { type: Object, required: true },
  stage: { type: Object, required: true },
  currentStage: { type: Object, required: true },
  totalStages: { type: Object, required: true },
  resolutionProgress: { type: Object, required: true },
  speed: { type: Object, required: true },
  logs: { type: Object, required: true },
  onAbort: Function
});

// 计算属性来获取响应式值
const progressValue = computed(() => props.progress.value);
const currentResolutionValue = computed(() => props.currentResolution.value);
const stageValue = computed(() => props.stage.value);
const currentStageValue = computed(() => props.currentStage.value);
const totalStagesValue = computed(() => props.totalStages.value);
const resolutionProgressValue = computed(() => props.resolutionProgress.value);
const speedValue = computed(() => props.speed.value);
const logsValue = computed(() => props.logs.value);

const autoScroll = ref(true);
const logContent = ref(null);

const formatMessage = (message) => {
  return message.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
};

const handleLogScroll = () => {
  if (!logContent.value) return;
  const { scrollTop, scrollHeight, clientHeight } = logContent.value;
  const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
  if (!isAtBottom) {
    autoScroll.value = false;
  }
};

const handleAbort = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要终止当前转换任务吗？',
      '终止确认',
      {
        confirmButtonText: '确定终止',
        cancelButtonText: '继续转换',
        type: 'warning'
      }
    );
    props.onAbort?.();
  } catch {
    // 用户取消终止操作
  }
};

watch(() => props.logs.value, () => {
  if (autoScroll.value) {
    nextTick(() => {
      if (logContent.value) {
        logContent.value.scrollTop = logContent.value.scrollHeight;
      }
    });
  }
}, { deep: true });
</script>

<style lang="scss" scoped>
@import '../styles/components/conversion-progress.scss';

.neo-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  gap: 8px;
  
  .switch-track {
    width: 40px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    
    .switch-thumb {
      position: absolute;
      left: 2px;
      top: 2px;
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
  
  &.active {
    .switch-track {
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 1);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      
      .switch-thumb {
        left: 22px;
        background: #000;
      }
    }
  }
  
  .switch-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
  }
}

.neo-button {
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
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
    background: rgba(20, 20, 20, 0.9);
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
  
  .neo-icon {
    font-style: normal;
    font-size: 1.2em;
  }
}
</style> 