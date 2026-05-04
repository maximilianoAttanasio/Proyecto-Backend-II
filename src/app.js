import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import initializePassport from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";
import productsRouter from "./routes/products.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conectado"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
