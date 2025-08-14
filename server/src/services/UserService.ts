import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async signup(login: string, password: string) {

    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return {
        success: false,
        status: 400,
        message: "Пользователь с таким логином уже существует"
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      login,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return {
      success: true,
      status: 201,
      message: "Пользователь успешно зарегистрирован",
      data: {
        id: user._id,
        login: user.login,
        token
      }
    };
  }

  async login({ login, password }: { login: string; password: string }) {
    try {
      const user = await User.findOne({ login });
      if (!user) {
        return { success: false, status: 400, message: "Неверный логин или пароль" };
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { success: false, status: 400, message: "Неверный логин или пароль" };
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      return { success: true, status: 200, data: { token, id: user._id, login: user.login } };
    } catch (e) {
      return { success: false, status: 500, message: "Ошибка сервера" };
    }
  }
}

export default new UserService();
