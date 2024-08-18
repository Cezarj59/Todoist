# Aplicativo de Gerenciamento de Tarefas

## Visão Geral

Este aplicativo é um sistema de gerenciamento de tarefas que permite criar, atualizar, consultar e excluir tarefas. Utiliza o Sequelize como ORM para interagir com um banco de dados PostgreSQL.

## Funcionalidades

- **Criar Tarefa:** Permite adicionar novas tarefas ao sistema.
- **Atualizar Tarefa:** Permite modificar os detalhes de uma tarefa existente.
- **Consultar Tarefas:** Permite listar todas as tarefas ou buscar tarefas específicas por ID, título ou status.
- **Excluir Tarefa:** Permite remover tarefas do sistema.

## Estrutura do Projeto

### Diretórios e Arquivos

- **`src/`**: Contém o código-fonte do aplicativo.
    - **`config/`**: Contém a configuração do banco de dados.
        - `configDb.ts`: Configura e inicializa a conexão com o banco de dados PostgreSQL.
    - **`controllers/`**: Contém os controladores que lidam com as requisições HTTP.
        - `tarefaController.ts`: Define as funções para criar, atualizar, consultar e excluir tarefas.
    - **`models/`**: Contém os modelos Sequelize que representam as tabelas do banco de dados.
        - **`interfaces/`**: Contém interfaces TypeScript para definir os atributos dos modelos.
            - `TarefaTypes.ts`: Define os atributos da tarefa e os atributos necessários para criar uma nova tarefa.
        - `Tarefa.ts`: Define o modelo de tarefa e sua configuração.
    - **`routes/`**: Contém as definições de rotas para o aplicativo.
        - `router.ts`: Define as rotas e mapeia para os controladores apropriados.
    - **`app.ts`**: Configura o aplicativo Express e aplica as rotas.
    - **`server.ts`**: Inicializa o servidor Express.

### Banco de Dados

O banco de dados é gerenciado pelo Sequelize e utiliza o PostgreSQL. A tabela `tarefas` é definida pelo modelo `Tarefa`, que inclui os seguintes campos:

- **`id`**: Identificador único da tarefa.
- **`titulo`**: Título da tarefa.
- **`descricao`**: Descrição detalhada da tarefa.
- **`status`**: Status da tarefa (concluída ou não).
- **`createdAt`**: Data de criação da tarefa (automaticamente definida pelo Sequelize).
- **`updatedAt`**: Data da última atualização da tarefa (automaticamente definida pelo Sequelize).

### Modelos e Interfaces

- **`TarefaAttributes`**: Interface que define os atributos de uma tarefa.
- **`TarefaCreationAttributes`**: Interface que define os atributos necessários para criar uma nova tarefa.

### Rotas da API

As seguintes rotas estão disponíveis para interagir com o sistema de gerenciamento de tarefas:

- **POST** `/tarefas`
    - **Descrição**: Cria uma nova tarefa.
    - **Corpo da Requisição**:
      ```json
      {
        "titulo": "string",
        "descricao": "string",
        "status": "boolean"
      }
      ```

- **PUT** `/tarefas/:id`
    - **Descrição**: Atualiza uma tarefa existente.
    - **Parâmetros da URL**:
        - `id` (número): ID da tarefa a ser atualizada.
    - **Corpo da Requisição**:
      ```json
      {
        "titulo": "string",
        "descricao": "string",
        "status": "boolean"
      }
      ```

- **GET** `/tarefas`
    - **Descrição**: Lista todas as tarefas.

- **GET** `/tarefas/:id`
    - **Descrição**: Consulta uma tarefa específica pelo ID.
    - **Parâmetros da URL**:
        - `id` (número): ID da tarefa a ser consultada.

- **GET** `/tarefas/titulo/:titulo`
    - **Descrição**: Consulta tarefas pelo título.
    - **Parâmetros da URL**:
        - `titulo` (string): Título da tarefa a ser consultada.

- **GET** `/tarefas/status/:status`
    - **Descrição**: Consulta tarefas pelo status.
    - **Parâmetros da URL**:
        - `status` (boolean): Status da tarefa a ser consultada.

- **DELETE** `/tarefas/:id`
    - **Descrição**: Remove uma tarefa existente.
    - **Parâmetros da URL**:
        - `id` (número): ID da tarefa a ser removida.

### Inicialização do Projeto

1. **Instalação de Dependências**
   ```bash
   npm install

2. **Inicialização do Servidor**
    ```bash
    npm start

3. **Rodar o Projeto**
    ```bash 
    npm run dev

## Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) Ambiente de execução JavaScript no lado do servidor.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) Superset do JavaScript que adiciona tipagem estática.
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) Sistema de gerenciamento de banco de dados relacional, hospedado na Vercel.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white) ORM para Node.js que facilita a interação com o banco de dados.
- ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) Plataforma para deploy e hospedagem de aplicações, incluindo bancos de dados.
- ![WebStorm](https://img.shields.io/badge/WebStorm-000000?logo=jetbrains&logoColor=white) IDE utilizada para o desenvolvimento do projeto.
- ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white) Sistema operacional utilizado no desenvolvimento e produção.
