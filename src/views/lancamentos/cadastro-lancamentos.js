import React from "react";
import Card from "../../components/cards";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/formgroup";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/services/lancamentoService";
import * as messages from "../../components/toastr";
import localStorageService from "../../app/services/localStorageService";

class CadastroLancamento extends React.Component {
  state = {
    id: null,
    descricao: "",
    valor: "",
    mes: "",
    ano: "",
    tipo: "",
    status: "",
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  submit = () => {
    const usuarioLogado = localStorageService.obterItem("_usuario_logado");

    const { descricao, valor, tipo, mes, ano } = this.state;
    const lancamento = {
      descricao,
      valor,
      tipo,
      mes,
      ano,
      usuario: usuarioLogado.id,
    };
    this.service
      .salvar(lancamento)
      .then((response) => {
        this.props.history.push("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento efetuado com sucesso.");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  render() {
    const meses = this.service.obterListaMeses();
    const tipos = this.service.obterListaTipos();

    return (
      <Card title="Cadastro de Lançamento">
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao" label="Descrição">
              <input
                id="inputDescricao"
                type="text"
                name="descricao"
                value={this.state.descricao}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputAno" label="Ano">
              <input
                id="inputAno"
                name="ano"
                value={this.state.ano}
                onChange={this.handleChange}
                type="text"
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputMes" label="Mês">
              <SelectMenu
                id="inputMes"
                className="form-control"
                name="mes"
                value={this.state.mes}
                onChange={this.handleChange}
                lista={meses}
              ></SelectMenu>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputValor" label="Valor">
              <input
                id="inputValor"
                name="valor"
                value={this.state.valor}
                onChange={this.handleChange}
                type="text"
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputTipo" label="Tipo">
              <SelectMenu
                id="inputTipo"
                className="form-control"
                name="tipo"
                value={this.state.tipo}
                onChange={this.handleChange}
                lista={tipos}
              ></SelectMenu>
            </FormGroup>
          </div>
          <div className="row">
            <div className="col-md-4">
              <button
                type="button"
                onClick={this.submit}
                className="btn btn-success"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={(e) =>
                  this.props.history.push("/consulta-lancamentos")
                }
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamento);
