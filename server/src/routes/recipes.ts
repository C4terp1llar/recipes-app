import { Router } from "express";

import {validate} from "../middleware/validate";
import {authMiddleware} from "../middleware/auth";
import RecipeController from "../controllers/RecipeController";
import {recipeCreateSchema} from "../validators/recipeSchema";

const router = Router();

router.post("", authMiddleware, validate(recipeCreateSchema), RecipeController.create);


export default router;
