import {Request, Response} from "express";
import {AuthRequest} from "../middleware/auth";
import RecipeService from "../services/RecipeService";
import {RecipeInput} from "../validators/recipeSchema";
import {IPagination, IRecipesFilter} from "../types";

class RecipeController {
  static async create(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const result = await RecipeService.create(req.body as RecipeInput, authReq.user.id);

      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const { id } = req.params;

      const result = await RecipeService.delete(id, authReq.user.id);

      if (result.status === 204) {
        return res.sendStatus(204);
      }

      res.status(result.status).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }


  static async getMany(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;

      const {q, sort, mode, category, page, limit} = req.query;

      const result = await RecipeService.getMany(
        {q, sort, mode, category} as IRecipesFilter, {page: page ? +page : 1, limit: limit ? +limit : 30} as IPagination, authReq.user.id
      );

      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }

}
export default RecipeController;