export const rules = {
  required: (value: string) => !!value || 'Поле обязательно',

  login: (value: string) =>
    /^[A-Za-z0-9]+$/.test(value) || 'Только латиница и цифры',

  minPasswordLength: (password: string) =>
    password.length >= 8 || 'Минимальная длина пароля — 8 символов',

  passwordCharset: (password: string) =>
    /^[A-Za-z0-9!@#$%^&*()_\-+={}[\]|:;"',.<>/?]+$/.test(password) ||
    'Только латиница, цифры и спецсимволы',

  passwordsMatch: (p1: string, p2: string) =>
    p1 === p2 || 'Пароли не совпадают',
}
