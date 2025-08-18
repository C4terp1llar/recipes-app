import { defineStore } from "pinia"
import { useNotificationStore } from "@/shared/store/useNotificationStore"
import { AxiosError } from "axios"
import type {IRecipeCreate, IRecipesOptions} from "@/features/recipe/types";
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

  const handleGetManyRecipes = async (options: IRecipesOptions, page: number, limit: number) => {
    try {
      return await recipeApi.getManyRecipes(options, page, limit)
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        ntfStore.addNotification("error", err?.response?.data?.message || "Ошибка при получении рецептов")
      } else {
        ntfStore.addNotification("error", "Непредвиденная ошибка")
      }
    }
  }

  const handleDeleteRecipe = async (id: string) => {
    try {
      await recipeApi.deleteRecipe(id)
      ntfStore.addNotification("success", `Рецепт успешно удален!`)
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        ntfStore.addNotification("error", err?.response?.data?.message || "Ошибка при удалени рецепта")
      } else {
        ntfStore.addNotification("error", "Непредвиденная ошибка")
      }
    }
  }

  return {
    handleCreateRecipe,
    handleGetManyRecipes,
    handleDeleteRecipe
  }
})
