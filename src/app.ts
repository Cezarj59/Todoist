import express from 'express';
import router from "./routes/router";
import {initializeDb} from "./config/configDb";

const app = express();

// Configuração de middlewares
app.use(express.json());

// Configuração das rotas
app.use(router);

// Configure o banco de dados
initializeDb();

export { app };
