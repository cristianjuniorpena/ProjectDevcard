import { use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [frase, setFrase] = useState("");
  const [curtidas, setCurtidas] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [escuro, setEscuro] = useState(() => {
    return localStorage.getItem("tema") !== "claro";
  });


  async function carregarDevCard() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(`${API_URL}/api/devcard`);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar dados do DevCard.");
      }

      const dados = await resposta.json();

      setPerfil(dados.perfil);
      setHabilidades(dados.habilidades);
      setProjetos(dados.projetos);
      setFrase(dados.fraseInicial);
      setRepositorios(dados.gitRepositorios);
    } catch (error) {
      setErro(
        "Não foi possível carregar o DevCard. Verifique se o back-end está rodando."
      );
    } finally {
      setCarregando(false);
    }
  }




  async function gerarNovaFrase() {
    try {
      setErro("");

      const resposta = await fetch(`${API_URL}/api/frase`);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar nova frase.");
      }

      const dados = await resposta.json();

      setFrase(dados.frase);
    } catch (error) {
      setErro("Não foi possível gerar uma nova frase.");
    }
  }



  useEffect(() => {
    carregarDevCard();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("tema-claro", !escuro);
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
  }, [escuro]);

  return (
    <main className="pagina">
      <button
        className="botao-tema"
        onClick={() => setEscuro(!escuro)}
        aria-label={escuro ? "Mudar para modo claro" : "Mudar para modo escuro"}
      >
        <FontAwesomeIcon icon={escuro ? faMoon : faSun}  className="icone-cor-tema"/>
      </button>
      <section className="devcard">
        <div className="topo">
          <div>
            <p className="etiqueta">Projeto 1 · DevCard VibeCode</p>
            <h1>{perfil ? perfil.nome : "Carregando DevCard..."}</h1>
            {perfil && <p className="apelido">@{perfil.apelido}</p>}
          </div>

          <div className="avatar">
            {perfil ? perfil.nome.charAt(0).toUpperCase() : "D"}
          </div>
        </div>

        {carregando && <p className="aviso">Buscando? em js dados da API...</p>}

        {perfil && (
          <section className="bloco destaque">
            <p className="status">{perfil.status}</p>

            <div className="info-grid">
              <div>
                <span>Turma</span>
                <strong>{perfil.turma}</strong>
              </div>

              <div>
                <span>Área</span>
                <strong>{perfil.area}</strong>
              </div>
            </div>

            <p className="bio">{perfil.bio}</p>
          </section>
        )}

        <section className="bloco">
          <div className="cabecalho-bloco">
            <h2>Frase dev</h2>
            <button className="botao-pequeno" onClick={gerarNovaFrase}>
              Nova frase
            </button>
          </div>

          <p className="frase">“{frase}”</p>
        </section>

        <section className="bloco">
          <h2>Habilidades</h2>

          <div className="habilidades">
            {habilidades.map((habilidade, index) => (
              <article className="habilidade" key={index}>
                <div className="habilidade-cabecalho">
                  {habilidade.img && (
                    <img 
                      src={`${API_URL}${habilidade.img}`} 
                      alt={`Ícone de ${habilidade.nome}`}
                      className="habilidade-img"
                    />
                  )}
                  <strong>{habilidade.nome}</strong>
                  <span className={`nivel-${habilidade.nivel}`}>{habilidade.nivel}</span>
                </div>
                <p>{habilidade.descricao}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bloco">
          <h2>Objetivo deste projeto</h2>

          <div className="projetos">
            {projetos.map((projeto, index) => (
              <article className="projeto" key={index}>
                <p className="tipo">{projeto.tipo}</p>
                <h3>{projeto.nome}</h3>
                <p>{projeto.descricao}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bloco">
          <h2>Repositórios GitHub</h2>

          <div className="repositorios">
            {repositorios.map((repositorio, index) => (
              <article className="repositorio" key={index}>
                <h3>{repositorio.nome}</h3>
                <p>{repositorio.descricao}</p>
                <div className="repositorio-links">
                  <a
                    href={repositorio.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no GitHub
                  </a>
                  {repositorio.siteLink && (
                    <a
                      href={repositorio.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-link"
                    >
                      Ver aplicação
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="acoes">
        <p>API REST iniciante Fazer sistemas conversarem usando rotas e JSON, Express e FASTapi</p>
          <button onClick={() => setCurtidas(curtidas + 1)}>
            Curtir DevCard
          </button>

          <div className="curtidas">
            <span>Curtidas</span>
            <strong>{curtidas}</strong>
          </div>
        </section>

        {erro && <p className="erro">{erro}</p>}
      </section>
    </main>
  );
}

export default App;