import { Model, DataTypes, Sequelize } from 'sequelize';
import { TarefaAttributes, TarefaCreationAttributes } from './interfaces/TarefaTypes'; // Ajuste o caminho conforme necessário
import { initializeDb } from '../config/configDb'; // Ajuste o caminho conforme necessário

// Obtém a instância do Sequelize usando a função initializeDb
const sequelize: Sequelize = initializeDb();

/**
 * Representa uma tarefa no sistema.
 *
 * @extends Model<TarefaAttributes, TarefaCreationAttributes>
 * @description O modelo Tarefa mapeia a tabela `tarefas` no banco de dados e inclui os métodos de acesso e manipulação
 *              dos registros dessa tabela.
 */
class Tarefa extends Model<TarefaAttributes, TarefaCreationAttributes> implements TarefaAttributes {
    /**
     * O identificador único da tarefa.
     *
     * @type {number}
     * @memberof Tarefa
     */
    public id!: number;

    /**
     * O título da tarefa.
     *
     * @type {string}
     * @memberof Tarefa
     */
    public titulo!: string;

    /**
     * A descrição detalhada da tarefa.
     *
     * @type {string}
     * @memberof Tarefa
     */
    public descricao!: string;

    /**
     * O status da tarefa (concluída ou não).
     *
     * @type {boolean}
     * @memberof Tarefa
     */
    public status!: boolean;
}

/**
 * Inicializa o modelo Tarefa.
 *
 * Define a estrutura da tabela `tarefas` no banco de dados.
 * Inclui a configuração para a criação automática dos campos `createdAt` e `updatedAt`.
 *
 * @param sequelize - Instância do Sequelize utilizada para conectar ao banco de dados.
 */
Tarefa.init({
    /**
     * O identificador único da tarefa.
     *
     * @type {DataTypes.INTEGER}
     * @memberof Tarefa
     */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    /**
     * O título da tarefa.
     *
     * @type {DataTypes.STRING}
     * @memberof Tarefa
     */
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    /**
     * A descrição detalhada da tarefa.
     *
     * @type {DataTypes.TEXT}
     * @memberof Tarefa
     */
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    /**
     * O status da tarefa.
     *
     * @type {DataTypes.BOOLEAN}
     * @memberof Tarefa
     */
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    /**
     * Configurações do modelo Tarefa.
     *
     * @property {Sequelize} sequelize - Instância do Sequelize utilizada para conectar ao banco de dados.
     * @property {string} modelName - Nome do modelo.
     * @property {string} tableName - Nome da tabela no banco de dados.
     * @property {boolean} timestamps - Define se os campos `createdAt` e `updatedAt` serão utilizados.
     */
    sequelize,
    modelName: 'Tarefa',
    tableName: 'tarefas',
    timestamps: true, // Define como true se você usar createdAt e updatedAt
});

export { Tarefa };
