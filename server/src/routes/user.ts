import { Router } from "express";
import UserController from "../controllers/UserController";
import {userSchemaReg, userSchemaLogin} from "../validators/userSchema";
import {validate} from "../middleware/validate";
import {authMiddleware} from "../middleware/auth";

const router = Router();

router.post("/signup", validate(userSchemaReg, 'body'), UserController.signup);
router.post("/login", validate(userSchemaLogin, 'body'), UserController.login);
router.get("/sync", authMiddleware, UserController.sync);
router.get("/me", authMiddleware, UserController.me);

export default router;
