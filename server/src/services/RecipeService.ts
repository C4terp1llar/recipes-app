import {RecipeInput} from "../validators/recipeSchema";
import Recipe from "../models/Recipe";

class RecipeService {
  async create(data: RecipeInput, userId: string) {
    const { title, ingredients, category, comment } = data;

    const recipe = await Recipe.create({
      title,
      ingredients,
      category,
      comment,
      author: userId,
    });

    return {
      success: true,
      status: 201,
      message: "Рецепт успешно добавлен",
      data: recipe,
    };
  }
}

export default new RecipeService();