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

export type RecipeInput = z.infer<typeof recipeCreateSchema>;

export const recipeGetManySchema = z.object({
  q: z.string().trim().max(100, "Слишком длинный запрос").optional(),

  category: z
    .enum(["breakfast", "lunch", "dinner", "snack", ''], "Выберите корректную категорию")
    .optional(),

  sort: z.enum(["asc", "desc"]).optional(),

  mode: z.enum(["all", "me"]).optional(),

  page: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().min(0).optional()
  ),

  limit: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().min(1).max(100).optional()
  ),
});

export type RecipeGetManyInput = z.infer<typeof recipeCreateSchema>;
