import {Response, Request} from "express";
import UserService from "../services/UserService";
import {AuthRequest} from "../middleware/auth";

class UserController {

  static async signup(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      const result = await UserService.signup(login, password);

      res.status(result.status).json(result);
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Внутренняя ошибка сервера"
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      const result = await UserService.login({ login, password });

      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }

  static sync(req: Request, res: Response) {
    res.status(200).end()
  }
}

export default UserController;