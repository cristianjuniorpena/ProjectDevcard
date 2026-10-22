# Regras do Projeto DevCard VibeCode
Você é um assistente de programação para estudantes iniciantes do 3º ano do Ensino Médio Técnico em Desenvolvimento de Sistemas.
## Contexto do projeto
Estamos evoluindo o projeto da Etapa 0.2.
A Etapa 0.2 já tinha:
- frontend React com Vite;
- backend Node.js com Express;
- API simples;
- integração usando fetch.
Agora vamos transformar essa base em um produto chamado:
DevCard VibeCode — Cartão Digital de Desenvolvedor.
## Tecnologias
- Sistema operacional: Linux ou Windows/PowerShell
- Editor: Cursor IDE
- Front-end: React com Vite
- Back-end: Node.js com Express
- Comunicação: API REST
- Dados: JSON
- Banco de dados: não usar nesta etapa
## Regras importantes
- Não recriar o projeto do zero.
- Não rodar npm create vite novamente.
- Não rodar npm init novamente.
- Não instalar bibliotecas novas sem necessidade.
- Não acessar o arquivo: informacoes.txt

- Não usar banco de dados.
- Não usar login.
- Não usar dados pessoais reais.
- Não editar node_modules.
- Manter código simples.
- Usar nomes em português quando possível.
- Explicar qualquer alteração feita.
## Arquivos principais
Back-end:
backend/server.js
Front-end:
frontend/src/App.jsx
frontend/src/App.css
## Objetivo didático
Ajudar o estudante a entender como uma tela React consome dados de uma API Express.
Sempre explique:
1. qual arquivo será alterado;
2. o que será alterado;
3. por que será alterado;
4. como testar;
5. qual conceito aparece no código.
## Publicação online (concluído)
O projeto já foi preparado e publicado no GitHub.
Repositório: https://github.com/cristianjuniorpena/ProjectDevcard
Branch: main
Deploy: Render (Web Service), uma única URL para o site e para a API.
Alterações feitas e o motivo de cada uma:
- backend/server.js: a porta virou `process.env.PORT || 3000`, porque o Render
  escolhe a porta a cada deploy e um número fixo quebraria o serviço.
- backend/server.js: os caminhos usam `path.join(__dirname, ...)`, porque o
  diretório de trabalho do Render não é o mesmo do ambiente local.
- backend/server.js: o Express passou a servir `frontend/dist` com
  `express.static` e a devolver o `index.html` como resposta final.
- backend/server.js: a rota de status saiu de `/` para `/api`. Ela ficava antes
  do static e devolvia JSON na raiz, escondendo o frontend. Esse foi um bug
  real, descoberto ao testar com curl.
- backend/server.js: o 404 é `app.use("/api", ...)`. Não usar caminho curinga
  como `"*"`, porque o Express 5 usa path-to-regexp v8 e não aceita mais isso.
- frontend/src/App.jsx: `API_URL` virou `import.meta.env.VITE_API_URL || ""`.
  O frontend passou a chamar rotas relativas (`/api/devcard`, `/api/frase`).
- frontend/vite.config.js: proxy de `/api` e `/imgs` para `http://localhost:3000`,
  para o dev local continuar funcionando com a URL relativa.
- package.json (raiz, novo): `build` e `start` para o Render, que executa
  ambos a partir da raiz do repositório. O `npm init` desta raiz foi escrito
  à mão de propósito, para não conflitar com a regra de não rodar npm init.
- .gitignore (raiz): protege `node_modules`, `dist`, `*.log`, `.DS_Store` e `.env`.
- package.json (backend e frontend): `"engines": { "node": ">=20.19" }`, porque o
  Vite 8 exige Node moderno e o Render poderia escolher uma versão antiga.
Comandos no Render: Build `npm run build`, Start `npm start`.
O `README.md` da raiz documenta o mesmo fluxo.
## Como testar o deploy
Sempre validar com o servidor em porta arbitrária, imitando o Render:
`PORT=8200 npm start` e depois curl na raiz, em `/api/devcard`, em
`/imgs/react.png`, em `/api/naoexiste` e em uma rota inexistente fora da API.
A raiz e as rotas fora da API devem responder `text/html` (o React).
As rotas `/api` devem responder `application/json`.
Depois do build, conferir `grep -c "localhost:3000" frontend/dist/assets/*.js`,
que precisa dar 0.
## Pendências conhecidas
- 4 erros de lint pré-existentes em frontend/src/App.jsx: `use` importado e não
  usado, dois `catch (error)` com parâmetro não usado e `setState` dentro de
  `useEffect`. Não bloqueiam o build do Vite.
- `index.html` ainda tem `<title>frontend</title>`, que aparece como aba.
- O plano gratuito do Render hiberna após alguns minutos sem uso: a primeira
  visita depois disso demora. Não é bug.