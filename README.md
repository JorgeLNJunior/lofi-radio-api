<div align="center" id="title">
  <h1>Lo-Fi Radio</h1>
</div>

<div align="center" id="short-description">

Simples aplicação de streaming de Lo-Fi Hip-Hop.

</div>

<div align="center" id="badges">

[![Actions Build](https://img.shields.io/github/workflow/status/JorgeLNJunior/lofi-radio-api/Node.js%20CI/master)](https://github.com/JorgeLNJunior/lofi-radio-api/actions?query=workflow%3A%22Node.js+CI%22)
[![Codecov](https://codecov.io/gh/JorgeLNJunior/lofi-radio-api/branch/master/graph/badge.svg?token=W07MKRKK4M)](https://codecov.io/gh/JorgeLNJunior/lofi-radio-api)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JorgeLNJunior_lofi-radio-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=JorgeLNJunior_lofi-radio-api)
[![License](https://img.shields.io/github/license/JorgeLNJunior/lofi-radio-api)](https://github.com/JorgeLNJunior/lofi-radio-api/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/lofi-radio-api?color=lgreen)](https://github.com/JorgeLNJunior/lofi-radio-api/releases)

</div>

<div align="center">

[**API »**](https://api-lofi-radio.herokuapp.com/) | [**Trello »**](https://trello.com/b/QZwOI6uT/lo-fi-radio)

</div>

## Tabela de Conteúdos
* [Sobre o Projeto](https://github.com/JorgeLNJunior/lofi-radio-api#sobre-o-projeto)
* [Rotas](https://github.com/JorgeLNJunior/lofi-radio-api#rotas)
* [Tecnologias](https://github.com/JorgeLNJunior/lofi-radio-api#tecnologias)
* [Instalação e configuração](https://github.com/JorgeLNJunior/lofi-radio-api#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  * [Requisitos](https://github.com/JorgeLNJunior/lofi-radio-api#requisitos)
  * [Opcional](https://github.com/JorgeLNJunior/lofi-radio-api#requisitos)
  * [Instalação](https://github.com/JorgeLNJunior/lofi-radio-api#instala%C3%A7%C3%A3o)
* [Licença](https://github.com/JorgeLNJunior/lofi-radio-api#licen%C3%A7a)

## Sobre o Projeto
- A fazer

## Rotas

Informações básicas sobre as rotas da aplicação.
| HTTP   | Rota                  | Descrição                       | Autenticação |
|--------|-----------------------|---------------------------------|--------------|
| GET    | /artists              | retorna uma lista de artistas   | não          |
| POST   | /artists              | registra um artista             | sim          |
| PATCH  | /artists/:uuid        | atualiza artistas               | sim          |
| DELETE | /artists/:uuid        | deleta um artistas              | sim          |
| POST   | /artists/:uuid/upload | upload dos arquivos de artistas | sim          |
| GET    | /songs                | retorna uma lista de músicas    | não          |
| POST   | /songs                | registra uma música             | sim          |
| PATCH  | /songs/:uuid          | atualiza uma música             | sim          |
| DELETE | /songs/:uuid          | deleta uma música               | sim          |
| POST   | /songs/:uuid/upload   | upload dos arquivos de músicas  | sim          |
| GET    | /playlists            | retorna uma lista de playlists  | não          |
| POST   | /playlists            | registra uma playlists          | sim          |
| PATCH  | /playlists/:uuid      | atualiza uma playlists          | sim          |
| DELETE | /playlists/:uuid      | deleta uma playlists            | sim          |
| GET    | /docs                 | documentação da API             | não          |

## Tecnologias
Este projeto foi construído com as seguintes tecnologias:
- [Node.js »](https://nodejs.org)
- [Express.js »](https://expressjs.com)
- [Typescript »](https://www.typescriptlang.org)
- [Jest »](https://jestjs.io)
- [GitHub Actions »](https://github.com/features/actions)
- [Swagger »](https://swagger.io)
- [TypeORM »](https://typeorm.io)
- [Azure Storage »](https://azure.microsoft.com/pt-br/pricing/details/storage/blobs/)

## Instalação e configuração
### Requisitos
  - [Node.js »](https://nodejs.org/en/download) na sua versão lts
  - Um Banco de dados [MySQL »](https://www.mysql.com)

### Opcional
  - Conta na plataforma [Codecov »](https://codecov.io)
  - Uma [SAS Key »](https://docs.microsoft.com/pt-br/azure/storage/common/storage-sas-overview) do Azure Storage.

### Instalação
  1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/lofi-radio-api.git`
  2. Instale as dependências: `npm i`
  3. Renomeie o arquivo `.env.example` para `.env`
  4. Execute as migrations com o comando `npm run typeorm migration:run`
  5. Execute o comando `npm run seed:run` para popular o banco de dados
  6. Para iniciar a aplicação execute `npm start:dev`, para os testes execute `npm test`

## Licença
Projeto sob a licença [MIT »](https://github.com/JorgeLNJunior/lofi-radio-api/blob/master/LICENSE.md)
