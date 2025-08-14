import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(422).json({
            message: "Ошибка валидации",
            errors: err.flatten().fieldErrors
          });
        }

        return res.status(400).json({
          message: "Неверный запрос",
          error: err instanceof Error ? err.message : String(err)
        });
      }
    };
