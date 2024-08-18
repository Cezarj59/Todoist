"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const configDb_1 = require("./config/configDb");
const app = (0, express_1.default)();
exports.app = app;
// Configuração de middlewares
app.use(express_1.default.json());
// Configuração das rotas
app.use(router_1.default);
// Configure o banco de dados
(0, configDb_1.initializeDb)();
