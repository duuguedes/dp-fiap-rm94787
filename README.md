# Sistema de Gerenciamento de Usuários

## Índice

1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Clonando o Repositório](#clonando-o-repositório)
4. [Instalando Dependências](#instalando-dependências)
5. [Rodando o Projeto](#rodando-o-projeto)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Front-end](#front-end)
8. [Back-end](#back-end)
9. [Persistência de Dados](#persistência-de-dados)
10. [Conclusão](#conclusão)

## Introdução

Esta aplicação é um sistema de gerenciamento de usuários, permitindo a criação, edição, exclusão e visualização de usuários. O front-end é construído com Next.js e o back-end utiliza um sistema de rotas para gerenciar as operações de CRUD.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- npm ou yarn

## Clonando o Repositório

Para clonar o repositório, execute o seguinte comando no terminal:

```
git clone https://github.com/duuguedes/dp-fiap-rm94787.git
```

Substitua seu-usuario e nome-do-repositorio pelo seu nome de usuário do GitHub e o nome do repositório.

## Instalando Dependências

Navegue até o diretório do projeto e instale as dependências:

```
cd dp-fiap-rm94787
npm install
```

```
npm run dev
```

O projeto estará disponível em http://localhost:3000.

## Estrutura do projeto

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── user-management/
│   │   │   ├── _components/
│   │   │   │   ├── user-management-table.tsx
│   │   │   │   └── user-management-edit-modal.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   ├── api/
│   │   ├── sign-in/
│   │   │   └── route.tsx
│   │   ├── user/
│   │   │   ├── [id]/
│   │   │   │   └── route.tsx
│   │   │   └── route.ts
│   └── types/
│       └── user.ts
└── utils/
    └── db.json
```

## Front-end

### Páginas

A aplicação possui uma página principal de gerenciamento de usuários, localizada em `src/app/(dashboard)/user-management/page.tsx`. Esta página faz uma requisição para a API para buscar a lista de usuários e exibi-los em uma tabela.

### Componentes

- **UserManagementTable**: Componente responsável por exibir a tabela de usuários.
- **UserManagementEditModal**: Modal para editar as informações de um usuário.

## Back-end

### Rotas

A aplicação possui as seguintes rotas para gerenciar usuários:

- `GET /api/user`: Retorna a lista de todos os usuários.
- `POST /api/user`: Cria um novo usuário.
- `GET /api/user/[id]`: Retorna um usuário específico pelo ID.
- `PUT /api/user/[id]`: Atualiza as informações de um usuário específico pelo ID.
- `DELETE /api/user/[id]`: Remove um usuário específico pelo ID.
- `POST /api/sign-in`: Realiza o login de um usuário.

## Persistência de Dados

Os dados dos usuários são armazenados em um arquivo JSON localizado em `src/utils/db.json`. As operações de CRUD são realizadas diretamente neste arquivo, utilizando o módulo `fs` do Node.js para ler e escrever os dados.

### Exemplo de Estrutura do db.json

```
{
  "users": [
    {
      "id": "Kp284mNLPX",
      "name": "Pedro Oliveira",
      "password": "senha789",
      "rm": "67890",
      "cpf": "456.789.123-00",
      "rg": "45.678.912-3",
      "profession": "Analista",
      "image": "uploads/default.png"
    }
  ]
}
```
