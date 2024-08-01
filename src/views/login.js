import React from "react";
import Card from "../components/cards";
import FormGroup from "../components/formgroup";
import { withRouter } from "react-router-dom";
import UsuarioService from "../app/services/usuarioService";
import { mensagemErro } from "../components/toastr";
import { AuthContext } from "../main/provedorAutenticacao";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    this.service
      .autenticar({
        email: this.state.email,
        senha: this.state.senha,
      })
      .then(response => {        
        this.context.iniciarSessao(response.data);
        this.props.history.push("/home");
      })
      .catch(erro => {
        mensagemErro(erro);
      });
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuarios");
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6 offset-md-3"         
        >
          <Card title="Login">
            <div className="row">
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
                    <i className="pi pi-sign-in"></i>  Entrar
                    </button> 
                    <button
                      onClick={this.prepareCadastrar}
                      className="btn btn-danger"
                    >
                      <i className="pi pi-plus"></i> Cadastrar
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

Login.contextType = AuthContext;

export default withRouter(Login);
