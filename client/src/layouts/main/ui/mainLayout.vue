<script setup lang="ts">
import Sidebar from "@/widget/sidebar/ui/sidebar.vue";
import {useUserStore} from "@/features/auth/store/useUserStore.ts";
import {onBeforeMount} from "vue";
import {setGlobalLoading} from "@/shared/utils/globalLoader.ts";

const userStore = useUserStore();

onBeforeMount(async () => {
  if (userStore.user) return
  setGlobalLoading(true);
  await userStore.handleGetUserInfo()
  setGlobalLoading(false);
})
</script>

<template>
  <main class="w-full h-full pa-2 d-flex max-md:flex-col gap-3 relative">
    <sidebar/>

    <router-view/>
  </main>
</template>

<style scoped>

</style>