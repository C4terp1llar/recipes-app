import type { CategoryType } from "@/features/recipe/types";

const recipeCategoryMap: Record<Exclude<CategoryType, "">, string> = {
  breakfast: "Завтрак",
  lunch: "Обед",
  dinner: "Ужин",
  snack: "Перекус"
};

export const getCategoryName = (category: Exclude<CategoryType, "">) => {
  return recipeCategoryMap[category];
}
