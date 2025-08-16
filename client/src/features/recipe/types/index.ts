export interface IRecipeCreate {
  title: string;
  ingredients: string[];
  category: "breakfast" | "lunch" | "dinner" | "snack";
  comment?: string;
}

export interface IRecipe {
  id: string;
  author: string;
  title: string;
  ingredients: string[];
  category: "breakfast" | "lunch" | "dinner" | "snack";
  comment?: string;
  createdAt: Date;
}