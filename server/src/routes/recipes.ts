import { Router } from "express";

import {validate} from "../middleware/validate";
import {authMiddleware} from "../middleware/auth";
import RecipeController from "../controllers/RecipeController";
import {recipeCreateSchema, recipeGetManySchema} from "../validators/recipeSchema";

const router = Router();

router.post("", authMiddleware, validate(recipeCreateSchema, 'body'), RecipeController.create);
router.get("", authMiddleware, validate(recipeGetManySchema, 'query'), RecipeController.getMany);
router.delete("/:id", authMiddleware, RecipeController.delete);


export default router;
