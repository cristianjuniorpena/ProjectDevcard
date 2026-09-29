const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const pastaImgs = path.join(__dirname, "imgs");
const pastaFrontend = path.join(__dirname, "..", "frontend", "dist");

app.use(cors());
app.use(express.json());
app.use("/imgs", express.static(pastaImgs));




const perfil = {
  nome: "Dev em Formação",
  apelido: "Papai Dotadão",
  turma: "3º SIS",
  area: "Programação Mobile e Back-End",
  status: "Aprendendo a criar projetos reais com apoio da IA",
  bio: "Estudante de Desenvolvimento de Sistemas explorando React, Node, Express e boas práticas de vibecoding.",
};

const habilidades = [
  {
    nome: "React",
    nivel: "iniciante",
    descricao: "Criar interfaces usando componentes, estado e eventos, junto a isso, conhecimento sobre html e css.",
    img: "/imgs/react.png"
  },
  {
    nome: "Node.js",
    nivel: "iniciante",
    descricao: "Executar JavaScript fora do navegador.",
    img: "/imgs/javascript.png"
  },
  {
    nome: "API REST",
    nivel: "iniciante",
    descricao: "Fazer sistemas conversarem usando rotas e JSON, Express e FASTapi",
  },
  {
    nome: "Vibecoding",
    nivel: "iniciante",
    descricao: "Usar IA para acelerar a criação, sem deixar de entender o código.",
    img: "/imgs/opencode.png"
  },
  {
    nome: "Python",
    nivel: "intermediário",
    descricao: "lógica de programação boa e conhecimento com bibliotecas FASTapi, Pyside6, requests, SQLite, etc.",
    img: "/imgs/python.png"
  },
  {
    nome: "Git e Github",
    nivel: "intermediário",
    descricao: "conhecimento de comandos git, versionamento e backup de versões",
    img: "/imgs/git.png"
  }
];

const projetos = [
  {
    nome: "DevLab Fundamentos",
    tipo: "Projeto de estudo",
    descricao: "Miniapp criado para entender React, estado, eventos, API e JSON.",
  },
  {
    nome: "DevCard VibeCode",
    tipo: "Projeto prático",
    descricao: "Cartão digital de desenvolvedor conectado a uma API Express.",
  },
  {
    nome: "divulgação do portfólio",
    tipo: "Projeto de divulgação",
    descricao: "Site para guardar meus conhecimentos e progresso como dev",
  },
];

const gitRepositorios = [{
  link: "https://github.com/cristianjuniorpena/Youtube-Clone-Project",
  nome: "Clonagem Youtube",
  descricao: "projeto de clonagem da interface do youtube, buscando compreender estruturas html e css",
  siteLink: "https://cristianjuniorpena.github.io/Youtube-Clone-Project/"
},
 {
  link: "https://github.com/cristianjuniorpena/ProjectWebAppFASTapi",
  nome: "Lista CSVs",
  descricao: "projeto VITE e FASTapi que cria lista baseado nos CSVs enviados pelo usuário",
  siteLink: "https://cristianjuniorpena.github.io/ProjectWebAppFASTapi/"
},
{
  link: "https://github.com/cristianjuniorpena/projeto-salgad-o",
  nome: "projeto salgado",
  descricao: "esse site é podre, só estou usando ele para testar a estrutura html desse site",
  siteLink : "https://cristianjuniorpena.github.io/projeto-salgad-o/"
}]

const frases = [
  "A IA acelera, mas o entendimento guia.",
  "Programar é transformar problemas grandes em passos pequenos.",
  "Código bom é aquele que funciona, pode ser lido e pode ser melhorado.",
  "Antes de pedir para a IA criar, descreva bem o que você quer.",
  "Vibecoding não é parar de programar: é aprender a orientar melhor a máquina.",
  "Quem entende a lógica consegue revisar melhor o que a IA entrega.",
];


function sortearFrase() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

app.get("/api", (req, res) => {
  res.json({
    mensagem: "API do DevCard VibeCode está funcionando.",
    rotas: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/repositorios",
      "/api/frase",
      "/api/devcard",
    ],
  });
});
  

app.get("/api/perfil", (req, res) => {
  res.json(perfil);
});

app.get("/api/habilidades", (req, res) => {
  res.json(habilidades);
});

app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

app.get("/api/repositorios", (req, res) => {
  res.json(gitRepositorios);
});

app.get("/api/frase", (req, res) => {
  res.json({
    frase: sortearFrase(),
  });
});

app.get("/api/devcard", (req, res) => {
  res.json({
    perfil,
    habilidades,
    projetos,
    fraseInicial: sortearFrase(),
    gitRepositorios
  });
});

app.use("/api", (req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada.",
    dica: "Confira se o endereço foi digitado corretamente.",
    rotasDisponiveis: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/repositorios",
      "/api/frase",
      "/api/devcard",
    ],
  });
});

app.use(express.static(pastaFrontend));

app.use((req, res) => {
  res.sendFile(path.join(pastaFrontend, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});