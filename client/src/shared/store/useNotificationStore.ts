import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {INotification} from "@/shared/types/index.ts";

export const useNotificationStore = defineStore('notification', () => {

    const notifications = ref<INotification[]>([]);

    const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string, timeout: number = 3000) => {
        const id = Date.now() + Math.random();
        notifications.value.push({
            id,
            type,
            message,
            timeout,
        });

        setTimeout(() => {
            removeNotification(id);
        }, timeout);
    };

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id);
    };

    return {
        notifications,
        addNotification,
        removeNotification
    };
});
