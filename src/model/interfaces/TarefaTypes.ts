import { Optional } from 'sequelize';

/**
 * Interface que define os atributos de uma tarefa no sistema.
 *
 * @interface TarefaAttributes
 * @property {number} id - O identificador único da tarefa. Este atributo é gerado automaticamente pelo banco de dados.
 * @property {string} titulo - O título da tarefa. Deve ser uma string não vazia.
 * @property {string} descricao - A descrição detalhada da tarefa. Pode ser uma string vazia ou nula.
 * @property {boolean} status - O status atual da tarefa. Indica se a tarefa está concluída (true) ou pendente (false).
 */
export interface TarefaAttributes {
    id: number;
    titulo: string;
    descricao: string;
    status: boolean;
}

/**
 * Interface que define os atributos necessários para criar uma nova tarefa.
 *
 * @interface TarefaCreationAttributes
 * @extends {Optional<TarefaAttributes, 'id'>}
 * @description Inclui todos os atributos de TarefaAttributes, exceto 'id', que é opcional
 *               durante a criação de novas tarefas. O 'id' é gerado automaticamente pelo banco de dados.
 */
export interface TarefaCreationAttributes extends Optional<TarefaAttributes, 'id'> {}
