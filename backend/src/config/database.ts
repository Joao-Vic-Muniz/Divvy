import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.databaseUrl);
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}