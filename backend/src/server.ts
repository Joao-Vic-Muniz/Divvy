// src/server.ts
import { app } from "./app.js";
import { env } from "./config/env.js";

async function bootstrap() {
  try {
    // Ex.: await connectDatabase(env.databaseUrl);

    app.listen(env.port, () => {
      console.log(`Servidor rodando em http://localhost:${env.port} (${env.nodeEnv})`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
    process.exit(1);
  }
}

bootstrap();