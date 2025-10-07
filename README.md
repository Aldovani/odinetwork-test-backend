# Awesome Works - IT Asset Management API

API desenvolvida como solução para o desafio técnico da Etapa 3. O objetivo é criar um sistema de back-end para gerenciar ativos de TI, seus responsáveis, localizações e histórico de manutenção.

---

## 📝 Sobre o Projeto

Este projeto é a solução para um cenário hipotético apresentado pela empresa Awesome Works. O gestor de TI, João Rodrigues, relatou a necessidade de um sistema para substituir o controle de ativos feito em planilhas Excel.

Os principais problemas a serem resolvidos são:
* Falta de registro sobre a localização dos equipamentos nos mais de 15 setores da empresa.
* Ausência de informação sobre qual colaborador é responsável por cada equipamento.
* Inexistência de um histórico de atendimentos e reparos quando um dispositivo apresenta defeito.

Esta API centraliza todas essas informações, criando uma fonte de verdade única para o gerenciamento de patrimônio de TI.

---

## ✨ Features

* **Gestão de Ativos (Assets):** CRUD completo para equipamentos.
* **Gestão de Colaboradores (Employees):** CRUD completo para colaboradores.
* **Gestão de Departamentos (Departments):** CRUD completo para os setores da empresa.
* **Rastreamento de Manutenção (Maintenance):** Registro e acompanhamento do histórico de reparos de cada ativo.
* **Validação de Dados:** Validação de todas as entradas da API usando DTOs.
* **Documentação Interativa:** API totalmente documentada com Swagger.

---

## 🛠️ Stack Técnica

A stack utilizada segue estritamente as tecnologias sugeridas no desafio:

* **Framework:** Nest.js
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Validação:** `class-validator` e `class-transformer`
* **Testes:** Jest (Testes automatizados como diferencial)
* **Documentação:** Swagger (Documentação como diferencial)

---

## 🗃️ Esquema do Banco de Dados

Este projeto requer um planejamento documentado, incluindo um esquema do banco de dados. Abaixo está a estrutura em DBML, que pode ser visualizada em ferramentas como o [dbdiagram.io](https://dbdiagram.io).

```dbml
Table departments {
  id integer [pk, increment]
  name varchar [unique, not null]
  created_at timestamp [default: `now()`, not null]
  updated_at timestamp [default: `now()`, not null]
}

Table employees {
  id integer [pk, increment]
  name varchar [not null]
  email varchar [unique, not null]
  department_id integer [not null]
  created_at timestamp [default: `now()`, not null]
  updated_at timestamp [default: `now()`, not null]
}

Table assets {
  id integer [pk, increment]
  prefix char(2) [not null]
  serial_number integer [not null]
  IMEI varchar [unique]
  name varchar [not null]
  department_id integer
  employee_id integer
  created_at timestamp [default: `now()`, not null]
  updated_at timestamp [default: `now()`, not null]
}

Table maintenances {
  id integer [pk, increment]
  problem_description text [not null]
  entry_date timestamp [not null]
  completion_date timestamp
  asset_id integer [not null]
  created_at timestamp [default: `now()`, not null]
  updated_at timestamp [default: `now()`, not null]
}

// Definição dos Relacionamentos
Ref: departments.id < employees.department_id
Ref: departments.id < assets.department_id
Ref: employees.id < assets.employee_id
Ref: assets.id < maintenances.asset_id
```

---

## 📖 API Documentation

A documentação completa dos endpoints está disponível via Swagger. Após iniciar a aplicação, acesse:

**[http://localhost:3000/api](http://localhost:3000)**

---

## 📥 Coleção da API (Insomnia)

[cite_start]Conforme os requisitos do desafio, uma coleção de requisições da API está incluída neste repositório. O arquivo pode ser encontrado na pasta `/insomnia` na raiz do projeto.

Para utilizar:
1.  Abra o Insomnia.
2.  Vá para `Application` > `Preferences` > `Data`.
3.  Clique em `Import Data` > `From File` e selecione o arquivo JSON da pasta `/insomnia`.

---



## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

* Node.js (v20 ou superior)
* NPM ou Yarn
* Docker (para uma instância do PostgreSQL) ou uma instalação local do PostgreSQL.

### Instalação

1.  **Clone o repositório**
    ```sh
    git clone [https://github.com/Aldovani/odinetwork-test-backend](https://github.com/Aldovani/odinetwork-test-backend.git)
    ```

2.  **Instale as dependências**
    ```sh
    cd odinetwork-test-backend
    npm install
    ```

3.  **Configure as variáveis de ambiente**
    Crie uma cópia do arquivo `.env.example` e renomeie para `.env`. Em seguida, preencha as variáveis
    ```
    # .env
    DATABASE_USER=root
    DATABASE_PASSWORD=root
    DATABASE_NAME=test
    PORT=8080
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```

4.  **Execute as migrations do Prisma**
    Este comando irá criar as tabelas no seu banco de dados com base no schema.
    ```sh
    npx prisma migrate deploy
    ```

### Executando a Aplicação

```sh
# Modo de desenvolvimento
npm run start:dev
```



---

## ✒️ Autor

**[Aldovani]**

* **LinkedIn:** [https://www.linkedin.com/in/seu-linkedin/](https://www.linkedin.com/in/Aldovani/)
* **GitHub:** [https://github.com/seu-usuario](https://github.com/Aldovani)
