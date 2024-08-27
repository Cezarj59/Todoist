import {Request, Response} from 'express';
import {Tarefa} from '../model/Tarefa';
import {Op} from 'sequelize';


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
export const createTarefa = async (req: Request, res: Response): Promise<void> => {
    try {
        const { titulo, descricao, status } = req.body;

        await Tarefa.create({ titulo, descricao, status });

        res.status(201).json({ message: 'Tarefa criada com sucesso' });
    } catch (error: any) {
        res.status(500).json({ error: 'Erro ao criar a tarefa', details: error.message });
    }
};


/**
 * Obtém todas as tarefas.
 *
 * @param req - O objeto de solicitação.
 * @param res - O objeto de resposta.
 */
export const getAllTarefas = async (req: Request, res: Response): Promise<void> => {
    try {
        const tarefas = await Tarefa.findAll();
        res.status(200).json(tarefas);
    } catch (error: any) {
        res.status(500).json({error: 'Erro ao buscar as tarefas', details: error.message});
    }
};

/**
 * Obtém uma tarefa pelo ID.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.id - O ID da tarefa a ser obtida.
 * @param res - O objeto de resposta.
 */
export const getTarefaById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const tarefa = await Tarefa.findByPk(id);

        if (tarefa) {
            res.status(200).json(tarefa);
        } else {
            res.status(404).json({error: 'Tarefa não encontrada'});
        }
    } catch (error: any) {
        res.status(500).json({error: 'Erro ao buscar a tarefa', details: error.message});
    }
};

/**
 * Obtém uma tarefa pelo título.
 *
 * @param req - O objeto de solicitação.
 * @param res - O objeto de resposta.
 */
export const getTarefaByTitulo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {titulo} = req.params; // Obtém o título da URL
        const tarefas = await Tarefa.findAll({
            where: {
                titulo: {
                    [Op.iLike]: `%${titulo}%` // Pesquisa insensível a maiúsculas/minúsculas
                }
            }
        });

        if (tarefas.length > 0) {
            res.status(200).json(tarefas);
        } else {
            res.status(404).json({error: 'Nenhuma tarefa encontrada com o título fornecido'});
        }
    } catch (error: any) {
        res.status(500).json({error: 'Erro ao buscar as tarefas', details: error.message});
    }
};
/**
 * Obtém tarefas pelo status.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.status - O status das tarefas a serem obtidas (true ou false).
 * @param res - O objeto de resposta.
 */
export const getTarefasByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const {status} = req.params;
        const tarefas = await Tarefa.findAll({
            where: {
                status: status === 'true' // Convertendo o parâmetro de string para booleano
            }
        });

        if (tarefas.length > 0) {
            res.status(200).json(tarefas);
        } else {
            res.status(404).json({error: 'Nenhuma tarefa encontrada com o status fornecido'});
        }
    } catch (error: any) {
        res.status(500).json({error: 'Erro ao buscar as tarefas', details: error.message});
    }
};

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
export const updateTarefa = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { titulo, descricao, status } = req.body;

        const tarefaId = Number(id);

        if (isNaN(tarefaId)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }

        const [updated] = await Tarefa.update(
            { titulo, descricao, status },
            { where: { id: tarefaId } }
        );

        if (updated) {
            res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa', details: error.message });
    }
};

/**
 * Remove uma tarefa pelo ID.
 *
 * @param req - O objeto de solicitação.
 * @param req.params - Parâmetros da URL.
 * @param req.params.id - O ID da tarefa a ser removida.
 * @param res - O objeto de resposta.
 */
export const deleteTarefa = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const tarefa = await Tarefa.findByPk(id);

        if (tarefa) {
            await tarefa.destroy();
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({error: 'Tarefa não encontrada'});
        }
    } catch (error: any) {
        res.status(500).json({error: 'Erro ao remover a tarefa', details: error.message});
    }
};
