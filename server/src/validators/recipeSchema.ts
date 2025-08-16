import { z } from "zod";

export const recipeCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Название обязательно")
    .max(100, "Название слишком длинное"),

  ingredients: z
    .array(z.string().trim().min(1, "Ингредиент не может быть пустым"))
    .min(1, "Должен быть хотя бы один ингредиент"),

  category: z.enum(["breakfast", "lunch", "dinner", "snack"], "Выберите корректную категорию"),

  comment: z
    .string()
    .trim()
    .max(500, "Комментарий слишком длинный")
    .optional(),
});

export type RecipeInput = z.infer<typeof recipeSchema>;
