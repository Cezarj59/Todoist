import { Model, DataTypes, Sequelize } from 'sequelize';
import { initializeDb } from '../config/configDb'; // Ajuste o caminho conforme necessário

// Obtém a instância do Sequelize usando a função initializeDb
const sequelize: Sequelize = initializeDb();

/**
 * Representa uma tarefa no sistema.
 *
 * @description O modelo `Tarefa` mapeia a tabela `tarefas` no banco de dados e define os atributos `id`, `titulo`,
 *              `descricao` e `status`, correspondentes às colunas dessa tabela. Além disso, o modelo herda métodos
 *              do Sequelize para criar, ler, atualizar e excluir registros de tarefas, permitindo manipulação fácil
 *              dos dados da tabela.
 */
class Tarefa extends Model {

    public id!: number;
    public titulo!: string;
    public descricao!: string;
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
