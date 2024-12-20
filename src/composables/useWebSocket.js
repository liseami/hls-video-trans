import { ref, onMounted, onUnmounted } from 'vue';

export function useWebSocket() {
    const progress = ref(0);
    const currentResolution = ref('');
    const stage = ref('');
    const currentStage = ref(0);
    const totalStages = ref(3);
    const resolutionProgress = ref(0);
    const speed = ref(0);
    const logs = ref([]);
    let ws = null;

    const addLog = (level, message) => {
        const time = new Date().toLocaleTimeString();
        logs.value.push({ level, message, time });
    };

    const connectWebSocket = () => {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.hostname}:3000`;

        ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'progress') {
                    progress.value = data.progress;
                    currentResolution.value = data.resolution;
                    stage.value = data.stage;
                    currentStage.value = data.currentStage;
                    totalStages.value = data.totalStages;
                    resolutionProgress.value = data.resolutionProgress;
                } else if (data.type === 'speed') {
                    speed.value = data.speed;
                } else if (data.type === 'log') {
                    addLog(data.level, data.message);
                }
            } catch (e) {
                console.error('WebSocket消息解析错误:', e);
            }
        };

        ws.onclose = () => {
            setTimeout(connectWebSocket, 1000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket错误:', error);
            addLog('error', 'WebSocket连接错误，尝试重新连接...');
        };
    };

    const abortConversion = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'abort' }));
        }
    };

    onMounted(() => {
        connectWebSocket();
    });

    onUnmounted(() => {
        if (ws) {
            ws.close();
        }
    });

    return {
        progress,
        currentResolution,
        stage,
        currentStage,
        totalStages,
        resolutionProgress,
        speed,
        logs,
        abortConversion
    };
} 