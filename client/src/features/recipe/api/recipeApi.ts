import type {IRecipe, IRecipeCreate, IRecipeGetMany, IRecipesOptions} from "@/features/recipe/types";
import {authApi} from "@/shared/api/authApi.ts";

export const recipeApi = {

  async createRecipe(recipe: IRecipeCreate) {
    const { data: { data } } = await authApi.post(`/recipes`, { ...recipe })
    return data as IRecipe
  },

  async deleteRecipe(id: string) {
    await authApi.delete(`/recipes/${id}`);
  },

  async getManyRecipes(options: IRecipesOptions, page: number, limit: number) {
    const { data: { data } } = await authApi.get(`/recipes`, {params: {...options, page, limit}})
    return data as IRecipeGetMany
  },
}