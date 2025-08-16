import {Request, Response} from "express";
import {AuthRequest} from "../middleware/auth";
import RecipeService from "../services/RecipeService";
import {RecipeInput} from "../validators/recipeSchema";

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
}
export default RecipeController;