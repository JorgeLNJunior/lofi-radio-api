<div align="center" id="title">

  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="130" img/>

  <h1>Typescript Project</h1>
</div>

<div align="center" id="short-description">

Projeto Typescript estruturado e configurado usando algumas boas práticas.

</div>

<div align="center" id="badges">

[![Actions Build](https://img.shields.io/github/workflow/status/JorgeLNJunior/typescript-project/Node.js%20CI/master)](https://github.com/JorgeLNJunior/typescript-project/actions?query=workflow%3A%22Node.js+CI%22)
[![Codecov](https://codecov.io/gh/JorgeLNJunior/typescript-project/branch/master/graph/badge.svg?token=W07MKRKK4M)](https://codecov.io/gh/JorgeLNJunior/typescript-project)
[![License](https://img.shields.io/github/license/JorgeLNJunior/typescript-project)](https://github.com/JorgeLNJunior/typescript-project/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/typescript-project?color=lgreen)](https://github.com/JorgeLNJunior/typescript-project/releases)

</div>

<div align="center">

[**URL para o projeto »**](https://github.com/JorgeLNJunior/typescript-project)

</div>

## Tabela de Conteúdos
* [Sobre o Projeto](https://github.com/JorgeLNJunior/typescript-project#sobre-o-projeto)
* [Rotas](https://github.com/JorgeLNJunior/typescript-project#rotas)
* [Tecnologias](https://github.com/JorgeLNJunior/typescript-project#tecnologias)
* [Instalação e configuração](https://github.com/JorgeLNJunior/typescript-project#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  * [Requisitos](https://github.com/JorgeLNJunior/typescript-project#requisitos)
  * [Opcional](https://github.com/JorgeLNJunior/typescript-project#requisitos)
  * [Instalação](https://github.com/JorgeLNJunior/typescript-project#instala%C3%A7%C3%A3o)
* [Licença](https://github.com/JorgeLNJunior/typescript-project#licen%C3%A7a)

## Sobre o Projeto
Projeto estruturado e configurado usando Typescript, Express, Jest, GitHub Actions, TypeORM, Swagger, Winston entre outros. Além de boas práticas como uso do ESLint + Prettier e CommitLint.

## Rotas

Informações básicas sobre as rotas da aplicação.
| HTTP   | Rota                        | Descrição                    | Autenticação |
|--------|-----------------------------|------------------------------|--------------|
| GET    | /register                   | registra um usuário          | não          |
| GET    | /login                      | autentica um usuário         | não          |
| GET    | /users                      | retorna todos os usuários    | sim          |
| GET    | /docs                       | documentação da API          | não          |

## Tecnologias
Este projeto foi construído com as seguintes tecnologias:
- [Node.js »](https://nodejs.org)
- [Express.js »](https://expressjs.com)
- [Typescript »](https://www.typescriptlang.org)
- [Jest »](https://jestjs.io)
- [GitHub Actions »](https://github.com/features/actions)
- [Swagger »](https://swagger.io)
- [TypeORM »](https://typeorm.io)

## Instalação e configuração
### Requisitos
  - [Node.js »](https://nodejs.org/en/download) na sua versão lts
  - Um Banco de dados suportado pelo [TypeORM »](https://typeorm.io)

### Opcional
  - Conta na plataforma [Codecov »](https://codecov.io)
  - Uma [API KEY »](https://docs.github.com/en/actions/reference/encrypted-secrets) do GitHub configurada no repositório para a action `dependabot-auto-merge`

### Instalação
  1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/typescript-project.git` ou clique no botão `Use this template` no GitHub
  2. Instale as dependências: `npm i`
  3. Renomeie o arquivo `.env.example` para `.env`
  4. Execute as migrations com o comando `npm run typeorm migration:run`
  5. Para iniciar a aplicação execute `npm start:dev`, para os testes execute `npm test`

## Licença
Projeto sob a licença [MIT »](https://github.com/JorgeLNJunior/typescript-project/blob/master/LICENSE.md)
