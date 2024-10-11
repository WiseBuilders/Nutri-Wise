# NutriWise Backend

Este projeto é o backend da aplicação **NutriWise**, desenvolvido em **Node.js** com **TypeScript** e utilizando **PostgreSQL** como banco de dados. Ele fornece funcionalidades para criar usuários e autenticar (login) através de uma API RESTful.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em seu ambiente de desenvolvimento:

- **Node.js** (versão 14 ou superior)
- **PostgreSQL** (versão 10 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Insomnia** ou outro software para testar API

## Configuração do Ambiente

1. **Clone o repositório**

   Clone o repositório do projeto para a sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/nutriwise-backend.git
   cd nutriwise-backend

2. **Instale as dependências**
   
    Execute o seguinte comando para instalar as dependências necessárias:
    ```bash
    npm install

3. **Configuração do Banco de Dados**
   
   Certifique-se de que o PostgreSQL esteja instalado e rodando. Crie um banco de dados no PostgreSQL com o nome de sua escolha (por exemplo, nutriwise_db). Você pode criar o banco diretamente no pgAdmin ou com o comando SQL:

   ```sql
   CREATE DATABASE nutriwise_db;

4. **Execute o seguinte comando SQL para criar a tabela users no banco de dados:**
   
    ```sql
    CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    weight NUMERIC(5, 2) NOT NULL,
    height NUMERIC(3, 2) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );
5. **Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias para conectar-se ao banco de dados PostgreSQL. Use o exemplo abaixo:**
    ```bash
    DB_USER=seu_usuario_postgres
    DB_HOST=localhost
    DB_NAME=nutriwise_db
    DB_PASS=sua_senha_postgres
    DB_PORT=5432

## Rodando o Projeto
Após a configuração do ambiente, siga os passos abaixo para rodar o projeto:

1. **Compile o TypeScript para JavaScript:**
    ```bash
    npm run build
2. **Inicie o servidor:**
    ```bash
    npm start

O servidor estará rodando na porta 3000 por padrão. Você pode acessar o servidor no seguinte endereço:
    ```bash
    http://localhost:3000

## Testando a API com Insomnia
### Instalando o Insomnia
Baixe e instale o Insomnia a partir do site oficial: https://insomnia.rest/download.

### Testando a criação de usuário
1. Abra o Insomnia e crie uma nova requisição POST.
2. Defina a URL como:
   ```bash
   http://localhost:3000/api/users/register
   
3. No corpo da requisição, selecione o tipo JSON e insira o seguinte conteúdo:
   ```json
   {
    "name": "João da Silva",
    "birthdate": "1990-05-20",
    "gender": "male",
    "weight": 75.5,
    "height": 1.75,
    "email": "joao.silva@example.com",
    "password": "senha123"
    }
4. Envie a requisição. Se tudo estiver correto, você receberá a seguinte resposta:
    ```json
    {
        "message": "Usuário criado com sucesso!"
    }
### Testando o login de usuário
1. Abra uma nova requisição POST no Insomnia.
2. Defina a URL como:
    ```bash
    http://localhost:3000/api/auth/login
    
3 .No corpo da requisição, selecione o tipo JSON e insira o seguinte conteúdo:

    
    {
        "email": "joao.silva@example.com",
        "password": "senha123"
    }

4. Envie a requisição. Se o login for bem-sucedido, você receberá a seguinte resposta:

    ```json
    {
    "id": 1,
    "name": "João da Silva",
    "birthdate": "1990-05-20",
    "gender": "male",
    "weight": 75.5,
    "height": 1.75,
    "email": "joao.silva@example.com"
    }

### Possíveis Erros
* Usuário já cadastrado: Ao tentar cadastrar um email que já existe no banco de dados, você receberá a seguinte mensagem de erro:
    ```json
        {
            "message": "Usuário já cadastrado"
        }
* Email ou senha incorretos: Se você tentar fazer login com um email não cadastrado ou uma senha incorreta, receberá as seguintes mensagens:
* Para email não cadastrado:
    ```json
    {
        "message": "Usuário não encontrado"
    }
* Para senha incorreta:
    ```json
    {
        "message": "Senha incorreta"
    }
### Scripts Disponíveis
* npm run build: Compila o código TypeScript para JavaScript.
* npm start: Inicia o servidor de produção (após a compilação).
* npm run dev: Inicia o servidor em modo de desenvolvimento com hot reload.

### Conclusão
Este projeto fornece uma base para a criação de uma API em Node.js com TypeScript, incluindo funcionalidades básicas de autenticação com PostgreSQL. Ele está configurado para ser testado facilmente usando ferramentas como o Insomnia. Para mais funcionalidades, como autenticação por tokens JWT, você pode estender o projeto.




   
