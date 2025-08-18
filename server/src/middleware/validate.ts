import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema, mode: 'body' | 'query') =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (mode === "query") {
          const parsed = schema.parse(req.query);
          Object.assign(req.query, parsed);
        } else {
          const parsed = schema.parse(req.body);
          Object.assign(req.body, parsed);
        }

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
