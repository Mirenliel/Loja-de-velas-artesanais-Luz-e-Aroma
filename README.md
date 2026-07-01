# Loja de Velas Artesanais Luz & Aroma

Sistema web desenvolvido para a disciplina de Implantação de Sistemas, com o objetivo de digitalizar o processo de reservas da Loja de Velas Artesanais **Luz & Aroma**.

O sistema permite que clientes visualizem um catálogo de produtos, realizem reservas para retirada na loja e que os funcionários consultem os pedidos através de uma área administrativa protegida por login.

---

# Funcionalidades

## Área do Cliente

* Página inicial da loja;
* Catálogo digital de velas artesanais;
* Visualização de fragrâncias, descrições e preços;
* Formulário de reserva;
* Seleção de produto e quantidade;
* Registro das reservas no banco de dados.

## Área Administrativa

* Login de acesso;
* Listagem de produtos;
* Consulta das reservas realizadas;
* Visualização das informações dos clientes.

---

# Tecnologias Utilizadas

## Front-end

* HTML5
* CSS3
* JavaScript

## Back-end

* Node.js
* Express

## Banco de Dados

* PostgreSQL (Supabase)

## Hospedagem

* Front-end: Vercel
* Back-end: Render

## Controle de Versão

* Git
* GitHub

---

# Estrutura do Projeto

```text
Loja de velas artesanais Luz e Aroma/
│
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── catalogo.html
│   ├── reserva.html
│   ├── login.html
│   └── admin.html
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── sql/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── vercel.json
├── .gitignore
└── README.md
```

---

# Banco de Dados

O sistema utiliza duas tabelas principais.

## Tabela `produtos`

Armazena as velas disponíveis para reserva.

Campos principais:

* id
* nome
* fragrancia
* descricao
* preco
* imagem_url

## Tabela `reservas`

Armazena as reservas realizadas pelos clientes.

Campos principais:

* id
* cliente_nome
* cliente_telefone
* produto_id
* quantidade
* observacao
* status
* criado_em

---

# Rotas da API

## Produtos

| Método | Rota                | Descrição                      |
| ------ | ------------------- | ------------------------------ |
| GET    | `/api/produtos`     | Lista todos os produtos        |
| GET    | `/api/produtos/:id` | Consulta um produto específico |

## Reservas

| Método | Rota            | Descrição                 |
| ------ | --------------- | ------------------------- |
| POST   | `/api/reservas` | Registra uma nova reserva |
| GET    | `/api/reservas` | Lista todas as reservas   |

## Login

| Método | Rota         | Descrição                               |
| ------ | ------------ | --------------------------------------- |
| POST   | `/api/login` | Realiza a autenticação do administrador |

## Status

| Método | Rota          | Descrição                               |
| ------ | ------------- | --------------------------------------- |
| GET    | `/api/status` | Verifica se a API está em funcionamento |

---

# Configuração do Ambiente

Crie um arquivo `.env` dentro da pasta `backend` utilizando o seguinte modelo:

```env
PORT=3000
DATABASE_URL=sua_string_de_conexao_supabase
FRONTEND_URL=http://localhost:5500

ADMIN_USER=admin
ADMIN_PASSWORD=senha
```

---

# Execução Local

## 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
```

## 2. Instalar as dependências

```bash
cd backend
npm install
```

## 3. Configurar o banco de dados

Execute o arquivo:

```text
backend/sql/database.sql
```

no PostgreSQL do Supabase.

## 4. Configurar as variáveis de ambiente

Crie o arquivo `.env` utilizando como base o `.env.example`.

## 5. Iniciar o backend

```bash
npm start
```

ou

```bash
npm run dev
```

(caso exista esse script).

## 6. Executar o frontend

Abra a pasta `frontend` utilizando um servidor estático, como a extensão **Live Server** do Visual Studio Code.

---

# Deploy

## Front-end (Vercel)

* Conectar o repositório GitHub;
* Definir `frontend` como diretório raiz do projeto;
* Publicar a aplicação.

## Back-end (Render)

Configurar as seguintes variáveis de ambiente:

* DATABASE_URL
* FRONTEND_URL
* ADMIN_USER
* ADMIN_PASSWORD

Após isso, publicar o serviço Node.js.

## Banco de Dados (Supabase)

* Criar um projeto PostgreSQL;
* Executar o script `database.sql`;
* Configurar a variável `DATABASE_URL` com a string de conexão do banco.

---

# Segurança

O sistema utiliza:

* HTTPS em ambiente de produção;
* Validação dos dados enviados pelos formulários;
* Controle de acesso à área administrativa;
* Variáveis sensíveis armazenadas em ambiente.

---

# Autor

**Luiz Otávio Fontenele Lopes**

Projeto desenvolvido para a disciplina de **Implantação de Sistemas**, utilizando HTML, CSS, JavaScript, Node.js, Express, PostgreSQL (Supabase), Render e Vercel.
