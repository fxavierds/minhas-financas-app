import React from "react";
import Card from "../components/cards";
import FormGroup from "../components/formgroup";
import { withRouter } from "react-router-dom";

class CadastroUsuario extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
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
              <button onClick={this.entrar} className="btn btn-success">
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
