import type {IPagination} from "@/shared/types";

export interface IRecipeCreate {
  title: string;
  ingredients: string[];
  category: Exclude<CategoryType, "">
  comment?: string;
}

export type CategoryType = "breakfast" | "lunch" | "dinner" | "snack" | "";

export interface IRecipe {
  id: string;
  author: string;
  authorId: string;
  title: string;
  ingredients: string[];
  category: Exclude<CategoryType, "">
  comment?: string;
  createdAt: Date;
  self: boolean;
}

export interface IRecipeGetMany {
  recipes: IRecipe[];
  pagination: IPagination;
}

export interface IRecipesOptions {
  q?: string;
  sort?: 'asc' | 'desc';
  mode?: "all" | "me";
  category?: CategoryType
}