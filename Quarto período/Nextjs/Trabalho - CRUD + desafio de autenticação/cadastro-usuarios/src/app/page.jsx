
"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:3001/usuarios";

const vazio = {
  nome: "",
  cpf: "",
  email: "",
  telefone: "",
  nascimento: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  senha: "",
};

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [formulario, setFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [dados, setDados] = useState(vazio);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregarUsuarios() {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(API);

      if (!resposta.ok) {
        throw new Error("Erro ao carregar usuários.");
      }

      const resultado = await resposta.json();
      setUsuarios(resultado);
    } catch {
      setErro(
        "Não foi possível conectar à API. Verifique se o JSON Server está rodando na porta 3001."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const filtrados = usuarios.filter((usuario) => {
    const termo = busca.toLowerCase();

    return (
      usuario.nome?.toLowerCase().includes(termo) ||
      usuario.email?.toLowerCase().includes(termo) ||
      usuario.cpf?.includes(termo)
    );
  });

  function novoUsuario() {
    setEditando(null);
    setDados({ ...vazio });
    setMensagem("");
    setErro("");
    setFormulario(true);
  }

  function editarUsuario(usuario) {
    setEditando(usuario);
    setDados({ ...vazio, ...usuario, senha: "" });
    setMensagem("");
    setErro("");
    setFormulario(true);
  }

  function atualizarCampo(evento) {
    const { name, value } = evento.target;
    let valor = value;

    if (name === "cpf") {
      valor = value.replace(/\D/g, "").slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (name === "telefone") {
      const n = value.replace(/\D/g, "").slice(0, 11);

      if (n.length <= 10) {
        valor = n
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      } else {
        valor = n
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2");
      }
    }

    if (name === "cep") {
      valor = value.replace(/\D/g, "").slice(0, 8)
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    if (name === "nascimento") {
      valor = value.replace(/\D/g, "").slice(0, 8)
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }

    if (name === "estado") {
      valor = value.toUpperCase().slice(0, 2);
    }

    setDados((anterior) => ({
      ...anterior,
      [name]: valor,
    }));
  }

  
  function validar() {
    if (
      !dados.nome.trim() ||
      !dados.cpf.trim() ||
      !dados.email.trim() ||
      !dados.telefone.trim() ||
      !dados.nascimento.trim() ||
      !dados.cep.trim() ||
      !dados.rua.trim() ||
      !dados.numero.trim() ||
      !dados.bairro.trim() ||
      !dados.cidade.trim() ||
      !dados.estado.trim()
    ) {
      return "Preencha todos os campos obrigatórios.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      return "Digite um e-mail válido.";
    }

    const cpf = dados.cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return "Digite um CPF válido com 11 dígitos.";
    }

    if (![10, 11].includes(dados.telefone.replace(/\D/g, "").length)) {
      return "Digite um telefone válido.";
    }

    if (dados.cep.replace(/\D/g, "").length !== 8) {
      return "O CEP deve ter 8 dígitos.";
    }

    const partes = dados.nascimento.split("/").map(Number);
    const [dia, mes, ano] = partes;
    const data = new Date(ano, mes - 1, dia);

    if (
      partes.length !== 3 ||
      !dia ||
      !mes ||
      !ano ||
      ano < 1900 ||
      data.getDate() !== dia ||
      data.getMonth() !== mes - 1 ||
      data.getFullYear() !== ano ||
      data > new Date()
    ) {
      return "Digite uma data válida no formato DD/MM/AAAA.";
    }

    if (!editando && dados.senha.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres.";
    }

    if (editando && dados.senha && dados.senha.length < 8) {
      return "A nova senha deve ter pelo menos 8 caracteres.";
    }

    return "";
  }

  async function salvarUsuario(evento) {
    evento.preventDefault();

    const erroValidacao = validar();

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro("");
    setMensagem("");

    const payload = { ...dados };

    if (editando && !payload.senha) {
      payload.senha = editando.senha;
    }

    try {
      const resposta = await fetch(
        editando ? `${API}/${editando.id}` : API,
        {
          method: editando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível salvar o usuário.");
      }

      setFormulario(false);

      setMensagem(
        editando
          ? "Usuário atualizado com sucesso!"
          : "Usuário cadastrado com sucesso!"
      );

      await carregarUsuarios();
    } catch (e) {
      setErro(e.message || "Erro ao salvar usuário.");
    }
  }

  async function excluirUsuario(usuario) {
    const confirmar = window.confirm(
      `Deseja realmente excluir o usuário ${usuario.nome}?`
    );

    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API}/${usuario.id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível excluir o usuário.");
      }

      setMensagem("Usuário excluído com sucesso!");
      setErro("");

      await carregarUsuarios();
    } catch (e) {
      setErro(e.message || "Erro ao excluir usuário.");
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a href="/" className="brand">
          <span className="brand-mark">U</span>
          <span>Usuários<span className="brand-light">Pro</span></span>
        </a>

        <p className="side-label">MENU PRINCIPAL</p>

        <div className="nav-item active">
          <span>♙</span>
          <span>Usuários</span>
          <span className="nav-count">{usuarios.length}</span>
        </div>

        <div className="sidebar-bottom">
          <div className="help-card">
            <strong>Área administrativa</strong>
            <p>Gerencie os cadastros em um só lugar.</p>
          </div>

          <div className="profile">
            <div className="avatar">AD</div>
            <div>
              <strong>Administrador</strong>
              <small>Painel de gestão</small>
            </div>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            Início <span>/</span> <strong>Usuários</strong>
          </div>

          <div className="topbar-right">
            <span className="status-dot" />
            Sistema de cadastro
            <div className="avatar avatar-small">AD</div>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">GESTÃO DE CADASTROS</div>
              <h1>Usuários</h1>
              <p>Visualize, cadastre e gerencie os usuários do sistema.</p>
            </div>

            <button
              className="button button-primary"
              onClick={novoUsuario}
            >
              <span className="button-symbol">+</span>
              Novo usuário
            </button>
          </div>

          {mensagem && (
            <div className="notice success">
              ✓ {mensagem}
              <button onClick={() => setMensagem("")}>×</button>
            </div>
          )}

          {erro && (
            <div className="notice danger">
              {erro}
              <button onClick={() => setErro("")}>×</button>
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">♙</div>
              <div>
                <span>Total de usuários</span>
                <strong>{usuarios.length}</strong>
                <small>Cadastros no sistema</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">✓</div>
              <div>
                <span>Resultados exibidos</span>
                <strong>{filtrados.length}</strong>
                <small>Conforme a pesquisa</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">▦</div>
              <div>
                <span>Módulo</span>
                <strong>Cadastro</strong>
                <small>Gestão de usuários</small>
              </div>
            </div>
          </div>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Lista de usuários</h2>
                <p>Confira os dados cadastrados e gerencie cada registro.</p>
              </div>

              <span className="record-badge">
                {filtrados.length} registro(s)
              </span>
            </div>

            <div className="table-toolbar">
              <div className="search-box">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Buscar por nome, e-mail ou CPF..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <button
                className="button button-outline"
                onClick={carregarUsuarios}
              >
                ↻ Atualizar
              </button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>USUÁRIO</th>
                    <th>CPF</th>
                    <th>TELEFONE</th>
                    <th>NASCIMENTO</th>
                    <th className="actions-heading">AÇÕES</th>
                  </tr>
                </thead>

                <tbody>
                  {carregando ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        Carregando usuários...
                      </td>
                    </tr>
                  ) : filtrados.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  ) : (
                    filtrados.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {usuario.nome.charAt(0).toUpperCase()}
                            </div>

                            <div className="user-info">
                              <strong>{usuario.nome}</strong>
                              <span>{usuario.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>{usuario.cpf}</td>
                        <td>{usuario.telefone}</td>
                        <td>{usuario.nascimento}</td>

                        <td>
                          <div className="row-actions">
                            <button
                              className="icon-button edit-action"
                              onClick={() => editarUsuario(usuario)}
                              title="Editar usuário"
                            >
                              ✎
                            </button>

                            <button
                              className="icon-button delete-action"
                              onClick={() => excluirUsuario(usuario)}
                              title="Excluir usuário"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span>
                Exibindo <strong>{filtrados.length}</strong> de{" "}
                <strong>{usuarios.length}</strong> usuários
              </span>
              <span>API JSON Server</span>
            </div>
          </section>

          <footer className="page-footer">
            <span>UsuáriosPro · Gestão de usuários</span>
            <span>Projeto acadêmico em Next.js</span>
          </footer>
        </div>
      </section>


      {formulario && (
        <div className="modal-backdrop">
          <section className="form-modal">
            <header className="modal-heading">
              <div className="modal-title-icon">♙</div>

              <div>
                <h2>
                  {editando ? "Editar usuário" : "Cadastrar usuário"}
                </h2>
                <p>Preencha os dados do usuário.</p>
              </div>

              <button
                className="close-button"
                type="button"
                onClick={() => setFormulario(false)}
              >
                ×
              </button>
            </header>

            <form onSubmit={salvarUsuario}>
              <div className="form-body">
                <div className="form-section-title">
                  <span className="section-icon">♙</span>
                  <div>
                    <h3>Dados pessoais</h3>
                    <p>Informações de identificação e contato.</p>
                  </div>
                </div>

                <div className="form-grid">
                  {[
                    ["nome", "Nome completo", "Nome e sobrenome"],
                    ["cpf", "CPF", "000.000.000-00"],
                    ["email", "E-mail", "nome@email.com"],
                    ["telefone", "Telefone", "(44) 99999-9999"],
                    ["nascimento", "Data de nascimento", "DD/MM/AAAA"],
                  ].map(([nome, rotulo, placeholder]) => (
                    <div
                      className={`field ${nome === "nome" ? "field-wide" : ""}`}
                      key={nome}
                    >
                      <label htmlFor={nome}>{rotulo} *</label>
                      <input
                        id={nome}
                        name={nome}
                        type={nome === "email" ? "email" : "text"}
                        placeholder={placeholder}
                        value={dados[nome]}
                        onChange={atualizarCampo}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="form-section-title section-spaced">
                  <span className="section-icon">⌖</span>
                  <div>
                    <h3>Endereço</h3>
                    <p>Informe o endereço residencial.</p>
                  </div>
                </div>

                <div className="form-grid">
                  {[
                    ["cep", "CEP", "00000-000"],
                    ["rua", "Rua / Avenida", "Nome da rua"],
                    ["numero", "Número", "123"],
                    ["bairro", "Bairro", "Seu bairro"],
                    ["cidade", "Cidade", "Sua cidade"],
                    ["estado", "Estado (UF)", "PR"],
                  ].map(([nome, rotulo, placeholder]) => (
                    <div
                      className={`field ${nome === "rua" ? "field-wide" : ""}`}
                      key={nome}
                    >
                      <label htmlFor={nome}>{rotulo} *</label>
                      <input
                        id={nome}
                        name={nome}
                        placeholder={placeholder}
                        value={dados[nome]}
                        onChange={atualizarCampo}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="form-section-title section-spaced">
                  <span className="section-icon">▣</span>
                  <div>
                    <h3>Segurança</h3>
                    <p>
                      {editando
                        ? "Deixe vazio para manter a senha atual."
                        : "Crie uma senha com pelo menos 8 caracteres."}
                    </p>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="senha">
                    Senha {!editando && "*"}
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Mínimo de 8 caracteres"
                    value={dados.senha}
                    onChange={atualizarCampo}
                    required={!editando}
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>

                {erro && <div className="notice danger">{erro}</div>}
              </div>

              <footer className="modal-footer">
                <span><span className="required">*</span> Obrigatório</span>

                <div>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => setFormulario(false)}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="button button-primary">
                    ✓ {editando ? "Salvar alterações" : "Cadastrar usuário"}
                  </button>
                </div>
              </footer>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}