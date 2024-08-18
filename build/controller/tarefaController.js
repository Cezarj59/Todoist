"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTarefa = exports.updateTarefa = exports.getTarefasByStatus = exports.getTarefaByTitulo = exports.getTarefaById = exports.getAllTarefas = exports.createTarefa = void 0;
const Tarefa_1 = require("../model/Tarefa");
const sequelize_1 = require("sequelize");
/**
 * Cria uma nova tarefa.
 *
 * @param req - O objeto de solicitação.
 * @param req.body - O corpo da solicitação.
 * @param req.body.titulo - O título da tarefa.
 * @param req.body.descricao - A descrição da tarefa.
 * @param req.body.status - O status da tarefa (concluída ou não).
 * @param res - O objeto de resposta.
 */
const createTarefa = async (req, res) => {
    try {
        const { titulo, descricao, status } = req.body;
        const novaTarefa = await Tarefa_1.Tarefa.create({ titulo, descricao, status });
        res.status(201).json(novaTarefa);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar a tarefa', details: error.message });
    }
};
exports.createTarefa = createTarefa;
/**
 * Obtém todas as tarefas.
 *
 * @param req - O objeto de solicitação.
 * @param res - O objeto de resposta.
 */
const getAllTarefas = async (req, res) => {
    try {
        const tarefas = await Tarefa_1.Tarefa.findAll();
        res.status(200).json(tarefas);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as tarefas', details: error.message });
    }
};
exports.getAllTarefas = getAllTarefas;
/**
 * Obtém uma tarefa pelo ID.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.id - O ID da tarefa a ser obtida.
 * @param res - O objeto de resposta.
 */
const getTarefaById = async (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = await Tarefa_1.Tarefa.findByPk(id);
        if (tarefa) {
            res.status(200).json(tarefa);
        }
        else {
            res.status(404).json({ error: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a tarefa', details: error.message });
    }
};
exports.getTarefaById = getTarefaById;
/**
 * Obtém uma tarefa pelo título.
 *
 * @param req - O objeto de solicitação.
 * @param res - O objeto de resposta.
 */
const getTarefaByTitulo = async (req, res) => {
    try {
        const { titulo } = req.params; // Obtém o título da URL
        const tarefas = await Tarefa_1.Tarefa.findAll({
            where: {
                titulo: {
                    [sequelize_1.Op.iLike]: `%${titulo}%` // Pesquisa insensível a maiúsculas/minúsculas
                }
            }
        });
        if (tarefas.length > 0) {
            res.status(200).json(tarefas);
        }
        else {
            res.status(404).json({ error: 'Nenhuma tarefa encontrada com o título fornecido' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as tarefas', details: error.message });
    }
};
exports.getTarefaByTitulo = getTarefaByTitulo;
/**
 * Obtém tarefas pelo status.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.status - O status das tarefas a serem obtidas (true ou false).
 * @param res - O objeto de resposta.
 */
const getTarefasByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const tarefas = await Tarefa_1.Tarefa.findAll({
            where: {
                status: status === 'true' // Convertendo o parâmetro de string para booleano
            }
        });
        if (tarefas.length > 0) {
            res.status(200).json(tarefas);
        }
        else {
            res.status(404).json({ error: 'Nenhuma tarefa encontrada com o status fornecido' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as tarefas', details: error.message });
    }
};
exports.getTarefasByStatus = getTarefasByStatus;
/**
 * Atualiza uma tarefa existente.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.id - O ID da tarefa a ser atualizada.
 * @param req.body - O corpo da solicitação.
 * @param req.body.titulo - O novo título da tarefa.
 * @param req.body.descricao - A nova descrição da tarefa.
 * @param req.body.status - O novo status da tarefa (concluída ou não).
 * @param res - O objeto de resposta.
 * @returns {Promise<void>} - Retorna uma Promise que resolve para void.
 */
const updateTarefa = async (req, res) => {
    try {
        // Obtém o ID da tarefa a ser atualizada e os novos dados do corpo da solicitação.
        const { id } = req.params;
        const { titulo, descricao, status } = req.body;
        // Converte o ID para um número se necessário.
        const tarefaId = Number(id);
        // Verifica se o ID é válido
        if (isNaN(tarefaId)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }
        // Atualiza a tarefa no banco de dados.
        const [updated] = await Tarefa_1.Tarefa.update({ titulo, descricao, status }, {
            where: { id: tarefaId },
            returning: true, // O retorno é opcional; pode ser removido se não precisar do objeto atualizado
        });
        if (updated) {
            // Busca e retorna a tarefa atualizada.
            const tarefa = await Tarefa_1.Tarefa.findByPk(tarefaId);
            res.status(200).json(tarefa);
        }
        else {
            // Retorna erro se a tarefa não for encontrada.
            res.status(404).json({ error: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        // Retorna erro se ocorrer algum problema ao atualizar a tarefa.
        res.status(500).json({ error: 'Erro ao atualizar a tarefa', details: error.message });
    }
};
exports.updateTarefa = updateTarefa;
/**
 * Remove uma tarefa pelo ID.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.id - O ID da tarefa a ser removida.
 * @param res - O objeto de resposta.
 */
const deleteTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = await Tarefa_1.Tarefa.findByPk(id);
        if (tarefa) {
            await tarefa.destroy();
            res.status(204).send(); // 204 No Content
        }
        else {
            res.status(404).json({ error: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao remover a tarefa', details: error.message });
    }
};
exports.deleteTarefa = deleteTarefa;
