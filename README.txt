Проект позволяет пользователю авторизоваться или регистрироваться, просматривать свои и чужие рецепты, добавлять новые и удалять существующие (свои).
Backend написан на Node.js + Express, frontend — на Vue 3 + TypeScript + Vuetify, хранение данных — MongoDB (на Atlas).

Стек технологий

-Frontend: Vue 3, Composition API, TypeScript, Vuetify, Pinia, Vue Router, Axios, Tailwind CSS
-Backend: Node.js, Express, Mongoose, CORS, dotenv
-База данных: MongoDB Atlas
-Сборка и запуск: npm, concurrently, Docker не используется
-Архитектура: FSD (frontend), монолит (frontend + backend в одном репозитории)

Особенности реализации

- Добавил возможность регистрации и сортировки/фильтрации в рецептах

Frontend и backend находятся в одном репозитории (монолит)
Frontend использует Vuetify для UI и Tailwind для кастомной верстки
Backend написан на Express + MongoDB через Mongoose
Сборка frontend и backend отдельно через npm scripts

Для запуска дев-сервера рекомендуется использовать npm run dev (в корне проекта), чтобы корректно работала разработка с прокси и HMR

!!! При запуске билд-версии (npm start) возможны проблемы с маршрутизацией фронта через Express:
!!! если вводить URL напрямую в адресной строке, может появляться ошибка Cannot GET /.


Установка и запуск


Установить зависимости для frontend и backend:

npm install
npm install --prefix client
npm install --prefix server

!!!!!!!!! Скачать .env (https://disk.yandex.ru/d/F3yNjYCMxJPwTg) и положить в корне /server:

Там будет наполнение:
MONGO_URI=<URI>
PORT=3000
JWT_SECRET=<SECRET>

Запуск в режиме разработки (!!рекомендуется):

npm run dev

Запускаются одновременно фронт и бек

- Frontend доступен по http://localhost:5173 (или порт Vite)
- Backend API доступен по http://localhost:3000/api

Сборка и запуск production:

npm run start

Собирается фронт и бек
Запускается Node.js сервер на PORT (по умолчанию 3000)
!!! Важно: при вводе URL напрямую в браузере возможна ошибка Cannot GET / из-за проксирования Express

!! Используется MongoDB Atlas, можно наполнить коллекции тестовыми данными, или ознакомится с ними использовав
строку подключения в Mongo Compas из .env