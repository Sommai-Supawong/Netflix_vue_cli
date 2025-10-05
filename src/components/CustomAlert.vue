<template>
  <transition name="alert-fade">
    <div v-if="isVisible" class="custom-alert" :class="[type, position]">
      <div class="alert-content">
        <div class="alert-icon">
          <span v-if="type === 'success'">✓</span>
          <span v-if="type === 'error'">✕</span>
          <span v-if="type === 'warning'">⚠</span>
          <span v-if="type === 'info'">ℹ</span>
        </div>
        <div class="alert-message">{{ message }}</div>
        <button class="close-btn" @click="closeAlert">✕</button>
      </div>
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CustomAlert',
  data() {
    return {
      isVisible: false,
      message: '',
      type: 'info', // success, error, warning, info
      position: 'top-right', // top-right, top-left, bottom-right, bottom-left
      timeout: 3000,
      progress: 100,
      timer: null
    }
  },
  methods: {
    showAlert(msg, type = 'info', time = 3000) {
      this.message = msg;
      this.type = type;
      this.timeout = time;
      this.isVisible = true;
      this.progress = 100;
      
      // Reset any existing timer
      if (this.timer) {
        clearInterval(this.timer);
      }
      
      // Progress bar animation
      const startTime = Date.now();
      const endTime = startTime + this.timeout;
      
      this.timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        this.progress = (remaining / this.timeout) * 100;
        
        if (remaining <= 0) {
          this.closeAlert();
        }
      }, 50);
    },
    closeAlert() {
      this.isVisible = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped>
.custom-alert {
  position: fixed;
  z-index: 10000;
  padding: 0;
  margin: 10px;
  max-width: 400px;
  min-width: 280px;
  animation: slideIn 0.3s ease-out forwards;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

/* Positioning */
.top-right {
  top: 20px;
  right: 20px;
}

.top-left {
  top: 20px;
  left: 20px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
}

.alert-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(145deg, #222, #1a1a1a);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.success {
  border-left: 4px solid #2ecc71;
}

.error {
  border-left: 4px solid #e74c3c;
}

.warning {
  border-left: 4px solid #f39c12;
}

.info {
  border-left: 4px solid #3498db;
}

.alert-icon {
  font-size: 20px;
  margin-right: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.success .alert-icon {
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.error .alert-icon {
  background-color: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

.warning .alert-icon {
  background-color: rgba(243, 156, 18, 0.2);
  color: #f39c12;
}

.info .alert-icon {
  background-color: rgba(52, 152, 219, 0.2);
  color: #3498db;
}

.alert-message {
  flex: 1;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
  padding-right: 8px;
}

.close-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.progress-bar {
  height: 3px;
  background: linear-gradient(90deg, rgba(229, 9, 20, 0.8), rgba(229, 9, 20, 0.4));
  transition: width 50ms linear;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.alert-fade-enter-active {
  transition: all 0.3s ease;
}

.alert-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.alert-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.alert-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-alert {
    max-width: calc(100vw - 40px);
    min-width: calc(100vw - 40px);
  }
}
</style>