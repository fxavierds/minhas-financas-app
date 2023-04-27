import React from "react";
import Card from "../components/cards";
import FormGroup from "../components/formgroup";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    mensagemErro: null,
  };

  entrar = () => {
    axios
      .post("http://localhost:8080/api/usuarios/autenticar", {
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("_usuario_logado", JSON.stringify(response.data));
        this.props.history.push("/home");
      })
      .catch((erro) => {
        this.setState({ mensagemErro: erro.response.data });
      });
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuarios");
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: "relative", left: "300px" }}
        >
          <Card title="Login">
            <div className="row">
              <div className="row">
                <span>{this.state.mensagemErro}</span>
              </div>
              <div className="col-lg-12">
                <div className="bs-component">
                  <fieldset>
                    <FormGroup label="E-mail" id="exampleInputEmail">
                      <input
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Digite o e-mail"
                      />
                    </FormGroup>
                    <FormGroup label="Senha" id="exampleInputSenha">
                      <input
                        type="password"
                        className="form-control"
                        value={this.state.senha}
                        onChange={(e) =>
                          this.setState({ senha: e.target.value })
                        }
                        id="inputSenha"
                        aria-describedby="senhaHelp"
                        placeholder="Digite a senha"
                      />
                    </FormGroup>
                    <button onClick={this.entrar} className="btn btn-success">
                      Entrar
                    </button>
                    <button
                      onClick={this.prepareCadastrar}
                      className="btn btn-danger"
                    >
                      Cadastrar
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
