# API RESTful com Node.js, TypeScript e Firebase

Esta é uma API RESTful desenvolvida em Node.js com TypeScript e Express, utilizando o Firebase como banco de dados e seguindo uma arquitetura em camadas. O projeto foi criado durante um treinamento e já implementa as principais operações de CRUD para gerenciamento de usuários.

## Tecnologias Utilizadas

- **Node.js & TypeScript**: Linguagem e ambiente de execução para desenvolvimento da API.
- **Express**: Framework para criação das rotas e gerenciamento das requisições HTTP.
- **Firebase (Firestore)**: Banco de dados NoSQL para armazenamento dos dados.
- **Arquitetura em Camadas**: 
  - **Controllers**: Responsáveis por receber as requisições HTTP, invocar os serviços e retornar respostas.
  - **Services**: Implementam as regras de negócio e interagem com a camada de repositório.
  - **Repositories**: Realizam as operações de CRUD diretamente no Firestore.
- **Middlewares**:
  - **Error Handling**: Tratamento centralizado de erros.
  - **Validação**: Uso do Celebrate para validar os dados das requisições.

## Funcionalidades Implementadas

- **GET /users**: Recupera todos os usuários cadastrados.
- **GET /users/:id**: Recupera um usuário específico pelo seu ID.
- **POST /users**: Cria um novo usuário (com validação dos dados via Celebrate).
- **PUT /users/:id**: Atualiza os dados de um usuário existente.
- **DELETE /users/:id**: Remove um usuário do sistema.



## Como Executar

1. **Clone o repositório:**
   ```bash```
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
2. **Instale as dependências:**
    ```bash```
    npm install
3. **Configure as variáveis de ambiente:**
    - Crie um arquivo .env na raiz do projeto e adicione:
    ```ini```
    GOOGLE_APPLICATION_CREDENTIALS=firebase-archiveconfig.json
    - Certifique-se de que o arquivo de credenciais do Firebase esteja disponível.
4. **Compile e execute a aplicação:**
    ```bash```
    npm run start


**A aplicação estará rodando na porta 3001.**

**Considerações**
- A aplicação utiliza middlewares para tratar erros e rotas não encontradas, garantindo respostas padronizadas.
- A validação de dados é feita com Celebrate para garantir que as requisições contenham os campos esperados.
- A arquitetura em camadas facilita a manutenção e a evolução do projeto, separando responsabilidades entre Controllers, Services e Repositories.