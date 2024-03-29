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

  cadastrar = () => {
    const { nome, email, senha, senhaRepeticao } = this.state;
    const usuario = {
      nome,
      email,
      senha,
      senhaRepeticao,
    };

    try {
      this.service.validar(usuario);
    } catch (erro) {
      const mensagens = erro.mensagens;

      mensagens.forEach((msg) => mensagemErro(msg));
      return false;
    }

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
              <i className="pi pi-save"></i>  Salvar
              </button>
              <button onClick={this.cancelar} className="btn btn-danger">
              <i className="pi pi-times"></i> Voltar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
