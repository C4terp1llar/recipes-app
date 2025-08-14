<script setup lang="ts">

import AuthForm from "@/features/auth/ui/authForm.vue";

const props = defineProps<{
  mode: 'login' | 'signup'
}>()

</script>

<template>
  <div class="max-w-125 w-full pa-4 shadow-lg shadow-blue-200 rounded-2xl flex flex-col justify-center items-center gap-4">
    <h1 class="text-center text-2xl">{{mode === 'login' ? 'Авторизация' : 'Регистрация'}}</h1>

    <auth-form :mode="props.mode"/>

    <router-link class="text-blue-400 hover:text-blue-600 hover:underline" :to="mode === 'login' ? '/signup' : '/login'">
      {{mode === 'login' ? 'У меня нет аккаунта' : 'У меня уже есть аккаунт'}}
    </router-link>
  </div>
</template>

<style scoped>

</style>