import { defineStore } from "pinia"
import { ref } from "vue"
import type { IUser } from "@/features/auth/types"
import { userApi } from "@/features/auth/api/userApi"
import { useNotificationStore } from "@/shared/store/useNotificationStore"
import router from "@/app/providers/router"
import { AxiosError } from "axios"

// стор для юзеринфы + ручки

export const useUserStore = defineStore("user", () => {
  const ntfStore = useNotificationStore()

  const user = ref<IUser | null>(null)

  const setSession = (payload: { id: string; login: string; token: string }) => {
    user.value = { id: payload.id, login: payload.login }
    localStorage.setItem("token", payload.token)
  }

  const handleLogin = async (login: string, password: string) => {
    try {
      const data = await userApi.login(login, password)
      setSession(data)
      ntfStore.addNotification("success", `Рады снова вас видеть, ${data.login}!`)
      await router.push("/my-recipes")
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        ntfStore.addNotification("error", err?.response?.data?.message || "Ошибка входа")
      } else {
        ntfStore.addNotification("error", "Непредвиденная ошибка")
      }
    }
  }

  const handleSignup = async (login: string, password: string) => {
    try {
      const data = await userApi.signup(login, password)
      setSession(data)
      ntfStore.addNotification("success", `Регистрация успешна! Добро пожаловать, ${data.login}!`)
      await router.push("/my-recipes")
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        ntfStore.addNotification("error", err?.response?.data?.message || "Ошибка регистрации")
      } else {
        ntfStore.addNotification("error", "Непредвиденная ошибка")
      }
    }
  }

  const handleGetUserInfo = async () => {
    try {
      if (user.value) return
      user.value = await userApi.getUserInfo()
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        ntfStore.addNotification("error", err?.response?.data?.message || "Ошибка при получении информации о пользователе")
      } else {
        ntfStore.addNotification("error", "Непредвиденная ошибка")
      }
    }
  }

  const logout = async () => {
    localStorage.removeItem("token")
    user.value = null
    await router.push("/login")
  }

  return {
    user,
    handleLogin,
    handleSignup,
    handleGetUserInfo,
    logout,
  }
})
