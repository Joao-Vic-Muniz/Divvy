
import express from "express";
import { errorHandler } from "./shared/middlewares/errorHandler.js";

export const app = express();

app.use(express.json());

// Rota de saúde para testar se a API está no ar
app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});


// app.use("/users", userRoutes);


app.use(errorHandler);