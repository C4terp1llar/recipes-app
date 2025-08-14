import { z } from "zod";

export const userSchemaReg = z.object({
  login: z
    .string()
    .trim()
    .min(1, "Логин обязателен")
    .max(50, "Логин слишком длинный")
    .refine(val => /^[A-Za-z0-9]+$/.test(val), "Логин может содержать только латиницу и цифры")
    .refine(val => !/\s/.test(val), "Логин не должен содержать пробелы"),

  password: z
    .string()
    .trim()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .max(50, "Пароль слишком длинный")
    .refine(val => /^[A-Za-z0-9!@#$%^&*()_\-+={}[\]|:;"',.<>/?]+$/.test(val), "Пароль может содержать только латиницу, цифры и спецсимволы")
    .refine(val => !/\s/.test(val), "Пароль не должен содержать пробелы"),
});

export type UserInputReg = z.infer<typeof userSchemaReg>;


export const userSchemaLogin = z.object({
  login: z
    .string("Логин должен быть строкой")
    .trim()
    .min(1, "Логин обязателен"),

  password: z
    .string("Пароль должен быть строкой")
    .trim()
    .min(1, "Пароль обязателен")
});

export type UserInputLogin = z.infer<typeof userSchemaLogin>;
