import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env para o processo
dotenv.config();

let sequelize: Sequelize;

/**
 * Inicializa e retorna uma instância do Sequelize.
 *
 * Esta função cria uma instância do Sequelize e a configura para conectar-se ao banco de dados PostgreSQL,
 * usando as variáveis de ambiente carregadas do arquivo `.env`. Se a instância já existir, a função apenas a retorna.
 * A função também realiza a autenticação da conexão com o banco de dados e sincroniza os modelos para garantir que
 * as tabelas necessárias existam.
 *
 * O processo de sincronização garante que a estrutura das tabelas no banco de dados esteja de acordo com os modelos
 * definidos na aplicação. A opção `force: false` assegura que as tabelas serão criadas se não existirem, mas não
 * serão removidas ou recriadas, evitando perda de dados e permitindo a manutenção dos dados existentes.
 *
 * - **Conexão com o Banco de Dados**: Utiliza a URL do banco de dados fornecida no arquivo `.env` para se conectar.
 * - **Autenticação**: Testa a conexão com o banco de dados para verificar se as credenciais e a URL estão corretas.
 * - **Sincronização dos Modelos**: Garante que as tabelas estejam sincronizadas com os modelos definidos, sem recriar as tabelas existentes.
 *
 * @returns {Sequelize} A instância do Sequelize configurada e conectada ao banco de dados.
 *
 * @throws {Error} Se ocorrer um erro durante a autenticação ou sincronização, o erro será impresso no console.
 */
export const initializeDb = (): Sequelize => {
    if (!sequelize) {
        // Cria uma nova instância do Sequelize com as configurações fornecidas
        sequelize = new Sequelize(process.env.POSTGRES_URL!, {
            dialect: 'postgres', // Define o dialeto do banco de dados como PostgreSQL
            dialectOptions: {
                ssl: {
                    require: true, // Requer SSL para a conexão com o banco de dados
                    rejectUnauthorized: false, // Permite conexões mesmo se o certificado SSL não for verificado
                }
            }
        });

        // Testa a conexão com o banco de dados
        sequelize.authenticate()
            .then(() => {
                console.log('Conexão com o banco de dados estabelecida com sucesso.');

                // Sincroniza os modelos com o banco de dados
                return sequelize.sync({ force: false });
            })
            .then(() => {
                console.log('Tabelas sincronizadas com o banco de dados.');
            })
            .catch((err) => {
                // Imprime erros encontrados durante a autenticação ou sincronização
                console.error('Erro ao conectar ao banco de dados ou sincronizar as tabelas:', err);
            });
    }
    return sequelize;
};
