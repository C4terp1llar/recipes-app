<script setup lang="ts">
import Sidebar from "@/widget/sidebar/ui/sidebar.vue";
import {useUserStore} from "@/features/auth/store/useUserStore.ts";
import {onMounted, ref} from "vue";
import GlobalLoader from "@/shared/ui/globalLoader.vue";

const userStore = useUserStore();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  if (userStore.user) return
  isLoading.value = true;
  await userStore.handleGetUserInfo()
  isLoading.value = false;
})
</script>

<template>
  <global-loader v-if="isLoading"/>
  <main class="w-full h-full pa-2 d-flex gap-3 relative" v-else>
    <sidebar/>

    <router-view/>
  </main>
</template>

<style scoped>

</style>