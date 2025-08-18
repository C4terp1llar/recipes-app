import {RecipeInput} from "../validators/recipeSchema";
import Recipe from "../models/Recipe";
import {IPagination, IRecipesFilter} from "../types";
import {Types} from "mongoose";

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

  async delete(recipeId: string, userId: string) {
    try {
      const recipe = await Recipe.findById(recipeId);

      if (!recipe) {
        return {
          success: false,
          status: 404,
          message: "Рецепт не найден",
        };
      }

      if (recipe.author.toString() !== userId) {
        return {
          success: false,
          status: 403,
          message: "Нет доступа для удаления этого рецепта",
        };
      }

      await recipe.deleteOne();

      return {
        success: true,
        status: 204,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        status: 500,
        message: "Ошибка при удалении рецепта",
      };
    }
  }


  async getMany(
    { q = "", sort = "desc", mode = "all", category }: IRecipesFilter,
    { page = 1, limit = 30 }: IPagination,
    userId: string
  ) {
    try {
      const filter: any = {};

      if (q) {
        filter.title = { $regex: q, $options: "i" };
      }

      if (category) {
        filter.category = category;
      }

      if (mode === "me") {
        filter.author = new Types.ObjectId(userId);
      }

      const total = await Recipe.countDocuments(filter);

      const recipes = await Recipe.aggregate([
        { $match: filter },
        { $sort: { createdAt: sort === "asc" ? 1 : -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorData"
          }
        },
        { $unwind: "$authorData" },
        {
          $project: {
            id: "$_id",
            _id: 0,
            author: "$authorData.login",
            authorId: "$authorData._id",
            self: { $eq: [{ $toString: "$authorData._id" }, userId] },
            title: 1,
            category: 1,
            ingredients: 1,
            comment: 1,
            createdAt: 1
          }
        }
      ]);


      const hasMore = page * (limit + 1) < total;

      return {
        success: true,
        status: 200,
        data: {
          recipes,
          pagination: {
            total,
            page,
            limit,
            hasMore,
          },
        },
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        status: 500,
        message: "Ошибка при получении рецептов",
      };
    }
  }

}

export default new RecipeService();