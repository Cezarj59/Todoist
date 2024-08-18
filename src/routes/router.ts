import {Router} from 'express';
import {
    createTarefa,
    deleteTarefa,
    getAllTarefas,
    getTarefaById, getTarefaByTitulo,
    getTarefasByStatus,
    updateTarefa
} from "../controller/tarefaController";

const router = Router();

router
    .post('/tarefas', createTarefa)
    .put('/tarefas/:id', updateTarefa)
    .get('/tarefas', getAllTarefas)
    .get('/tarefas/:id', getTarefaById)
    .get('/tarefas/titulo/:titulo', getTarefaByTitulo)
    .get('/tarefas/status/:status', getTarefasByStatus)
    .delete('/tarefas/:id', deleteTarefa)

export default router;