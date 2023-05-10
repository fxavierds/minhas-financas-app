import React from "react";
import Card from "../components/cards";
import FormGroup from "../components/formgroup";
import { withRouter } from "react-router-dom";
import UsuarioService from "../app/services/usuarioService";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

class CadastroUsuario extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  validar() {
    const msgs = [];

    if (!this.state.nome) {
      msgs.push("O campo nome é obrigatório");
    }

    if (!this.state.email) {
      msgs.push("O campo email é obrigatório");
    } else if (
      !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)
    ) {
      msgs.push("Informe um email válido");
    }

    if (!this.state.senha || !this.state.senhaRepeticao) {
      msgs.push("Digite a senha 2x");
    } else if (this.state.senha !== this.state.senhaRepeticao) {
      msgs.push("As senhas não batem");
    }

    return msgs;
  }

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg);
      });

      return false;
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
    };
    this.service
      .salvar(usuario)
      .then((response) => {
        mensagemSucesso("Usuario criado com sucesso. Efetue login");
      })
      .catch((error) => {
        mensagemErro(error.response.data);
      });
  };

  cancelar = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" id="inputNome">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.nome}
                  onChange={(e) => this.setState({ nome: e.target.value })}
                  id="inputNome"
                  name="nome"
                />
              </FormGroup>
              <FormGroup label="Email: *" id="inputEmail">
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  id="inputEmail"
                  name="email"
                />
              </FormGroup>
              <FormGroup label="Senha: *" id="inputSenha">
                <input
                  type="password"
                  className="form-control"
                  value={this.state.senha}
                  onChange={(e) => this.setState({ senha: e.target.value })}
                  id="inputSenha"
                  name="senha"
                />
              </FormGroup>
              <FormGroup label="Repete senha: *" id="inputRepete">
                <input
                  type="password"
                  className="form-control"
                  value={this.state.senhaRepeticao}
                  onChange={(e) =>
                    this.setState({ senhaRepeticao: e.target.value })
                  }
                  id="inputRepete"
                  name="repeteSenha"
                />
              </FormGroup>
              <button onClick={this.cadastrar} className="btn btn-success">
                Salvar
              </button>
              <button onClick={this.cancelar} className="btn btn-danger">
                Voltar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
