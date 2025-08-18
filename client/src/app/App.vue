<script setup lang="ts">
import Notifications from "@/shared/ui/notifications.vue";
import GlobalLoader from "@/shared/ui/globalLoader.vue";
import {isGlobalLoading} from "@/shared/utils/globalLoader.ts";
</script>

<template>
  <v-app>
    <!--  контейнер для уведомлений   -->
    <notifications/>
    <!--  глобальный загрузчик для sync или обязательных данных   -->
    <global-loader v-if="isGlobalLoading"/>
    <router-view v-else/>
  </v-app>
</template>

<style scoped></style>
