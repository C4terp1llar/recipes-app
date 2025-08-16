import {publicApi} from "@/shared/api/publicApi.ts";
import {authApi} from "@/shared/api/authApi.ts";
import type {IAuthResponse, IUser} from "@/features/auth/types";

export const userApi = {
  async login(login: string, password: string) {
    const { data: { data } } = await publicApi.post(`/users/login`, { login, password })
    return data as IAuthResponse
  },

  async signup(login: string, password: string) {
    const { data: { data } } = await publicApi.post(`/users/signup`, { login, password })
    return data as IAuthResponse
  },

  async getUserInfo() {
    const { data: { data } } = await authApi.get(`/users/me`)
    return data as IUser
  }
}