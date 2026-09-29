# DevCard VibeCode

Cartão digital de desenvolvedor, feito com **React (Vite)** no front-end e **Node.js (Express)** no back-end.

O back-end serve uma API REST com os dados do perfil, e o front-end consome essa API para montar a tela.

## Estrutura

```
.
├── backend/
│   ├── server.js      API Express (rotas /api)
│   ├── imgs/          ícones das habilidades
│   └── package.json
└── frontend/
    ├── src/App.jsx    componente React que busca os dados
    ├── src/App.css    estilos da página
    ├── vite.config.js proxy do ambiente de desenvolvimento
    └── package.json
```

## Rodar localmente

Precisa de dois terminais.

**Terminal 1 — back-end (porta 3000):**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — front-end (porta 5173):**

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Em desenvolvimento, o Vite encaminha as chamadas de `/api` e `/imgs`
para o Express através do proxy configurado em `vite.config.js`.
Por isso o front-end usa endereços relativos e funciona igual
na versão publicada.

## Rotas da API

| Rota              | Retorna                        |
| ----------------- | ------------------------------ |
| `/api`            | status e lista de rotas        |
| `/api/perfil`     | dados do perfil                |
| `/api/habilidades`| lista de habilidades           |
| `/api/projetos`   | lista de projetos              |
| `/api/repositorios` | repositórios do GitHub       |
| `/api/frase`      | uma frase aleatória            |
| `/api/devcard`    | tudo junto, em um único objeto |

## Como a aplicação é servida

O Express cuida das duas coisas na mesma porta:

1. as rotas `/api` respondem JSON;
2. qualquer outro caminho devolve o `frontend/dist`, que é o React já compilado.

Assim existe **uma única URL** para o site e para a API.

A porta vem de `process.env.PORT`, e não de um número fixo,
porque o Render escolhe a porta do servidor a cada deploy.

## Publicar no Render

O Render constrói o front-end e sobe o back-end no mesmo serviço.

| Campo            | Valor                              |
| ---------------- | ---------------------------------- |
| Build Command    | `cd frontend && npm install && npm run build` |
| Start Command    | `cd backend && npm start`          |
| Node (Environment)| 20.19 ou superior                 |

Depois do primeiro deploy, `npm start` roda o Express, que já encontra
o `frontend/dist` compilado e publica o site.

> No plano gratuito o servidor hiberna após alguns minutos sem uso.
> A primeira visita depois disso pode demorar um pouco para carregar.
