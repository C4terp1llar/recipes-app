# Recipes App

Проект позволяет пользователю авторизоваться или регистрироваться, просматривать свои и чужие рецепты, добавлять новые и удалять существующие (свои).

**Backend** написан на Node.js + Express, **frontend** — на Vue 3 + TypeScript + Vuetify, хранение данных — MongoDB (Atlas).

## Стек технологий

**Frontend:**
- Vue 3, Composition API, TypeScript
- Vuetify, Pinia, Vue Router, Axios
- Tailwind CSS

**Backend:**
- Node.js, Express, Mongoose, JWT, Bcrypt

**База данных:**
- MongoDB 

**Сборка и запуск:**
- npm, concurrently
- Docker не используется

**Архитектура:**
- FSD (frontend)
- MVC (backend)
- Монолит (frontend + backend в одном репозитории)

---

## Особенности реализации

- Возможность регистрации пользователей
- Сортировка и фильтрация рецептов
- Авторизация через логин и пароль
- Добавление, удаление и просмотр своих рецептов
- Frontend использует Vuetify для UI и Tailwind для кастомной верстки
- Backend написан на Express + MongoDB через Mongoose
- Сборка frontend и backend отдельно через npm scripts

**Важно:**  
Для корректной работы дев-сервера рекомендуется использовать `npm run dev` (в корне проекта), чтобы корректно работала разработка с прокси и HMR.

> ⚠️ При запуске билд-версии (`npm start`) возможны проблемы с маршрутизацией фронта через Express:  
> если вводить URL напрямую в адресной строке, может появляться ошибка `Cannot GET /`.

---

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 2.Скачать файл .env (https://disk.yandex.ru/d/F3yNjYCMxJPwTg) и положить в корень /server:
> ⚠️ Название файла .env

Пример содержимого
- MONGO_URI=URI
- PORT=3000
- JWT_SECRET=SECRET

### 3. Запуск в режиме разработки (рекомендуется)

```bash
   npm run dev
```

- Frontend доступен по: http://localhost:5173
- Backend API доступен по: http://localhost:3000/api

> ⚠️ Режим разработки поддерживает HMR и корректное проксирование.

### 3. Сборка и запуск production 

```bash
   npm run start
```

- Собираются frontend и backend
- Запускается Node.js сервер на порту PORT (по умолчанию 3000)

> ⚠️ Важно: при вводе URL напрямую в браузере возможна ошибка Cannot GET / из-за проксирования Express.

---
### Данные для входа (можно зарегистрироваться)

- логин: test 
- пароль: qwerty123


- логин: test2
- пароль: qwerty123


- логин: alesha
- пароль: 123123123
---

### База данных

- Используется MongoDB Atlas.
> Можно наполнить коллекции тестовыми данными или использовать подключение из .env в MongoDB Compass для ознакомления/редактирования с данных.