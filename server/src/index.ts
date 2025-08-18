import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// роуты
import usersRouter from "./routes/user";
import recipesRouter from "./routes/recipes";
app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);

// БД лежит на mongo atlas
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("БД подключена"))
  .catch(err => console.error(err));

// статика + геты без /api => сбилженный клиент
app.use(express.static(path.join(__dirname, "../../client/dist")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
// });

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
