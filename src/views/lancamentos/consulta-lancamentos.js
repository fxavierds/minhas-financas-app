import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/cards";
import FormGroup from "../../components/formgroup";
import SelectMenu from "../../components/selectMenu";
import Lancamentostable from "./lancamentostable";
import LancamentoService from "../../app/services/lancamentoService";
import localStorageService from "../../app/services/localStorageService";
import * as messages from "../../components/toastr";

class ConsultaLancamento extends React.Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    lancamentos: [],
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  buscar = () => {
    if (!this.state.ano) {
      messages.mensagemErro("Campo ano obrigatório");
      return false;
    }

    const usuarioLogado = localStorageService.obterItem("_usuario_logado");
    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id,
    };

    this.service
      .consultar(lancamentoFiltro)
      .then((resposta) => {
        this.setState({ lancamentos: resposta.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editar = (id) => {
    console.log("Editanto ", id);
  };

  deletar = (lancamento) => {
    this.service
      .deletar(lancamento.id)
      .then((resposta) => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        lancamentos.splice(index, 1);
        this.setState(lancamentos);
        messages.mensagemSucesso("Lançamento excluído com sucesso");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu erro ao tentar excluir lançamento");
      });
  };

  render() {
    const meses = this.service.obterListaMeses();

    const tipos = this.service.obterListaTipos();

    return (
      <Card title="Consulta Lançamento">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputAno" label="Ano:">
                <input
                  type="text"
                  className="form-control"
                  id="inputAno"
                  value={this.state.ano}
                  onChange={(e) => this.setState({ ano: e.target.value })}
                  placeholder="Digite o ano"
                />
              </FormGroup>
              <FormGroup htmlFor="inputMes" label="Mês:">
                <SelectMenu
                  id="inputMes"
                  className="form-control"
                  value={this.state.mes}
                  onChange={(e) => this.setState({ mes: e.target.value })}
                  lista={meses}
                ></SelectMenu>
              </FormGroup>
              <FormGroup htmlFor="inputDesc" label="Descrição:">
                <input
                  type="text"
                  className="form-control"
                  id="inputDesc"
                  value={this.state.descricao}
                  onChange={(e) => this.setState({ descricao: e.target.value })}
                  placeholder="Digite a descrição"
                />
              </FormGroup>
              <FormGroup htmlFor="inputTipo" label="Tipo:">
                <SelectMenu
                  id="inputTipo"
                  className="form-control"
                  value={this.state.tipo}
                  onChange={(e) => this.setState({ tipo: e.target.value })}
                  lista={tipos}
                ></SelectMenu>
              </FormGroup>

              <button
                onClick={this.buscar}
                type="button"
                className="btn btn-success"
              >
                Buscar
              </button>
              <button type="button" className="btn btn-danger">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <Lancamentostable
                lancamentos={this.state.lancamentos}
                editAction={this.editar}
                deleteAction={this.deletar}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamento);
