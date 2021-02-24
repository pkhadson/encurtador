# Encurtador de URLs

## O que é uma URL?

Uma URL ou Uniform Resource Locator é um endereço que direciona a determinado recurso web. A URL pode te encaminhar a arquivos ou a alguma aplicação.

A URL pode carregar consigo informações importantes, o acúmulo dessas informações pode deixar o URL muito grande, dificultando o compartilhamento.

# Tecnologias

- NestJs
- SequelizeORM
- Postgres
- Docker
- Swagger
- Jest

# Instalação

1.  Clone o repositório com os arquivos do repositório em sua máquina
2.  Instale todas as dependências `npm install`
3.  Faça a inicialização dos containers `make up`
4.  Certifique que o container está rodando `curl 127.0.0.1:3000` _(troque 3000 pela porta escolhida)_

5.  Rode o roteiro de testes unitários `make test`

# Deploy

## Heroku

1.  Faça login em sua conta da `heroku login`
2.  Acesse o Heroku através do browser e crie um app
3.  Entre no diretório da aplicação `heroku git:remote -a pk-encurtador` _(substitua **pk-encurtador** pelo nome do app no Heroku)_
4.  Entre no diretório de devops `cd src/devos`
5.  Faça pull da image `heroku container:push web --context-path ../..`
6.  Finalize o deploy `heroku container:release web`
7.  Monitore os logs `heroku logs --tail`

|                     |                                         |
| ------------------- | --------------------------------------- |
| Documentação da API | https://pk-encurtador.herokuapp.com/api |
| DEMO                | https://pk-encurtador.herokuapp.com/    |
