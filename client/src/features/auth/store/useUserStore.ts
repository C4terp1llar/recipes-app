import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {IUser} from "@/features/auth/types";
import {publicApi} from "@/shared/api/publicApi.ts";
import {useNotificationStore} from "@/shared/store/useNotificationStore.ts";
import router from "@/app/providers/router.ts";
import {AxiosError} from "axios";

// здесь хранится инфа о юзере + ручки для логина/рега

export const useUserStore = defineStore('user', () => {
  const ntfStore = useNotificationStore()

  const user = ref<IUser | null>(null);

  const handleLogin = async (login: string, password: string) => {
    try{
      const {data: {data}} = await publicApi.post(`/users/login`, {login, password})

      user.value = {login: data.login, id: data.id};
      localStorage.setItem('token', data.token);
      ntfStore.addNotification('success', `Рады снова вас видеть, ${data.login}!`);

      await router.push('/my-recipes');
    }catch(err){
      console.error(err)
      if (err instanceof AxiosError){
        ntfStore.addNotification('error', err?.response?.data?.message);
      }
    }
  }

  const handleSignup = async (login: string, password: string) => {
    try{
      const {data: {data}} = await publicApi.post(`/users/signup`, {login, password})

      user.value = {login: data.login, id: data.id};
      localStorage.setItem('token', data.token);
      ntfStore.addNotification('success', `Регистрация успешна! Добро пожаловать, ${data.login}!`);

      await router.push('/my-recipes');
    }catch(err){
      console.error(err)
      if (err instanceof AxiosError){
        ntfStore.addNotification('error', err?.response?.data?.message);
      }
    }
  }

  return {
    user,
    handleLogin,
    handleSignup
  }
});