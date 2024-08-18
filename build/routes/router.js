"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarefaController_1 = require("../controller/tarefaController");
const router = (0, express_1.Router)();
router
    .post('/tarefas', tarefaController_1.createTarefa)
    .put('/tarefas/:id', tarefaController_1.updateTarefa)
    .get('/tarefas', tarefaController_1.getAllTarefas)
    .get('/tarefas/:id', tarefaController_1.getTarefaById)
    .get('/tarefas/titulo/:titulo', tarefaController_1.getTarefaByTitulo)
    .get('/tarefas/status/:status', tarefaController_1.getTarefasByStatus)
    .delete('/tarefas/:id', tarefaController_1.deleteTarefa);
exports.default = router;
