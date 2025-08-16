import { defineStore } from "pinia"
import { ref } from "vue"
import type { IUser } from "@/features/auth/types"
import { userApi } from "@/features/auth/api/userApi"
import { useNotificationStore } from "@/shared/store/useNotificationStore"
import router from "@/app/providers/router"
import { AxiosError } from "axios"
import type {IRecipeCreate} from "@/features/recipe/types";
import {recipeApi} from "@/features/recipe/api/recipeApi.ts";

// стор для рецептов + ручки

export const useRecipeStore = defineStore("recipe", () => {
  const ntfStore = useNotificationStore()

  const handleCreateRecipe = async (recipe: IRecipeCreate) => {
    try {
      await recipeApi.createRecipe(recipe)
      ntfStore.addNotification("success", `Рецепт успешно добавлен!`)
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        ntfStore.addNotification("error", err?.response?.data?.message || "Ошибка при создании рецепта")
      } else {
        ntfStore.addNotification("error", "Непредвиденная ошибка")
      }
    }
  }

  return {
    handleCreateRecipe
  }
})
