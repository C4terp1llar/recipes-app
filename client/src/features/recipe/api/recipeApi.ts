import type {IRecipe, IRecipeCreate} from "@/features/recipe/types";
import {authApi} from "@/shared/api/authApi.ts";

export const recipeApi = {

  async createRecipe(recipe: IRecipeCreate) {
    const { data: { data } } = await authApi.post(`/recipes`, { ...recipe })
    return data as IRecipe
  },

  async deleteRecipe(id: string) {

  }
}