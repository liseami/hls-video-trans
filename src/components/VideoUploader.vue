<template>
  <div class="upload-section">
    <div class="input-section">
      <el-input
        v-model="outputFolderName"
        placeholder="输出文件夹名称"
        :prefix-icon="Folder"
        class="modern-input"
      >

      </el-input>
    </div>

    <div 
      class="drop-zone"
      :class="{ 
        'is-dragover': isDragover,
        'is-ready': outputFolderName
      }"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @dragenter.prevent="isDragover = true"
      @dragleave.prevent="isDragover = false"
    >
      <el-upload
        class="upload-area"
        drag
        :action="`/upload?folderName=${encodeURIComponent(outputFolderName)}`"
        name="video"
        :auto-upload="true"
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :disabled="!outputFolderName"
        accept="video/*"
      >
        <div class="upload-content" :class="{ 'is-disabled': !outputFolderName }">
          <div class="upload-icon">
            <vue3-lottie
              :animation-data="uploadAnimation"
              :height="60"
              :width="60"
              :loop="true"
              :auto-play="true"
            />
          </div>
          <div class="upload-text">
            <h3>拖拽视频到此处或点击上传</h3>
            <div class="format-info">
              <span class="format-item">MP4</span>
              <span class="format-item">MOV</span>
              <span class="format-item">AVI</span>
              <span class="format-item">MKV</span>
            </div>
            <p class="upload-hint">文件大小不超过 1GB</p>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Folder } from '@element-plus/icons-vue';
import { Vue3Lottie } from 'vue3-lottie';
import uploadAnimationData from '../assets/upload-animation.json';
import { validateFolderName } from '../composables/validation';

const props = defineProps({
  onUploadStart: Function,
  onUploadSuccess: Function,
  onUploadError: Function
});

const isDragover = ref(false);
const outputFolderName = ref('');
const uploadAnimation = ref(uploadAnimationData);

const handleDrop = (e) => {
  isDragover.value = false;
};

const beforeUpload = (file) => {
  if (!validateFolderName(outputFolderName.value)) {
    return false;
  }

  // 检查文件类型
  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
  if (!allowedTypes.includes(file.type)) {
    ElMessage.error('只支持 MP4, MOV, AVI, MKV 格式的视频文件');
    return false;
  }

  // 检查文件大小（限制为1GB）
  const maxSize = 1024 * 1024 * 1024; // 1GB
  if (file.size > maxSize) {
    ElMessage.error('文件大小不能超过1GB');
    return false;
  }

  props.onUploadStart?.();
  return true;
};

const handleSuccess = (response) => {
  props.onUploadSuccess?.(response);
};

const handleError = (error) => {
  props.onUploadError?.(error);
};
</script>

<style lang="scss" scoped>
.upload-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-section {
  .modern-input {
    :deep(.el-input__wrapper) {
      background: rgba(30, 30, 30, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: none !important;
      border-radius: 8px;
      height: 42px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(40, 40, 40, 0.8);
        border-color: rgba(255, 255, 255, 0.2);
      }

      &.is-focus {
        background: rgba(45, 45, 45, 0.9);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .el-input__inner {
        color: rgba(255, 255, 255, 0.9);
        height: 42px;
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      }

      .el-input__prefix {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    :deep(.el-input-group__append) {
      background: rgba(40, 40, 40, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-left: none;
      color: rgba(255, 255, 255, 0.4);
      padding: 0 12px;
    }
  }
}

.drop-zone {
  background: rgba(30, 30, 30, 0.6);
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &.is-dragover {
    background: rgba(40, 40, 40, 0.8);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.01);
  }

  &.is-ready {
    background: rgba(35, 35, 35, 0.7);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  :deep(.el-upload-dragger) {
    background: transparent;
    border: none;
    width: 100%;
    height: auto;
    padding: 1.5rem;

    &:hover {
      background: rgba(255, 255, 255, 0.03);
    }
  }
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem;
  
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.upload-icon {
  flex-shrink: 0;
}

.upload-text {
  text-align: left;
  flex-grow: 1;

  h3 {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 0.5rem;
    font-weight: 500;
  }
}

.format-info {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.format-item {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: 'SF Mono', monospace;
}

.upload-hint {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  margin: 0;
}

@media (max-width: 640px) {
  .upload-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .upload-text {
    text-align: center;
  }

  .format-info {
    justify-content: center;
  }
}
</style>