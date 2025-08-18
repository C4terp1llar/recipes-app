<script setup lang="ts">
import { useNotificationStore } from "@/shared/store/useNotificationStore.ts";

const ntfStore = useNotificationStore();

const notificationMap = new Map([
  ['error', 'mdi-alert-octagon-outline'],
  ['warning', 'mdi-alert-outline'],
  ['success', 'mdi-check-circle-outline'],
  ['info', 'mdi-information-variant-circle-outline']
]);

const getIcon = (type: string) => notificationMap.get(type);
</script>

<template>
  <div v-if="ntfStore.notifications.length" class="fixed right-4 z-[100] max-w-lg ml-3 bottom-4 p-4 flex flex-col gap-4">
    <div
        v-for="notification in ntfStore.notifications"
        :key="notification.id"
        :class="[
        'flex z-[100] w-fit ml-auto items-center gap-3 p-2! rounded-xl border shadow-lg transform transition-colors duration-300 bg-white ',
        notification.type === 'success' && 'border-green-500! border-2! text-green-500!',
        notification.type === 'error' && 'border-red-500! border-2! text-red-500!',
        notification.type === 'warning' && 'border-yellow-500! border-2! text-yellow-500!',
        notification.type === 'info' && 'border-blue-500! border-2! text-blue-500!'
        ]"
    >
      <v-icon>{{ getIcon(notification.type) }}</v-icon>
      <span class="text-wrap break-words break-all">{{ notification.message }}</span>
      <v-btn
          class="ml-auto"
          variant="plain"
          icon="mdi-close"
          @click="ntfStore.removeNotification(notification.id)"
      />
    </div>
  </div>
</template>
