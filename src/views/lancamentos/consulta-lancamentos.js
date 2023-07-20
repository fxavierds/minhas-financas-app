import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/cards";
import FormGroup from "../../components/formgroup";
import SelectMenu from "../../components/selectMenu";
import Lancamentostable from "./lancamentostable";
import LancamentoService from "../../app/services/lancamentoService";
import localStorageService from "../../app/services/localStorageService";
import * as messages from "../../components/toastr";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

class ConsultaLancamento extends React.Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    lancamentos: [],
    showConfirmDialog: false,
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
      lancamentoDeletar: {},
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
    this.props.history.push(`cadastro-lancamentos/${id}`);
  };

  abrirConfirmacao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento });
  };

  cancelaDelecao = (lancamento) => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} });
  };

  deletar = () => {
    console.log("Editando ", this.state.lancamentoDeletar);
    this.service
      .deletar(this.state.lancamentoDeletar.id)
      .then((resposta) => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(this.state.lancamentoDeletar);
        lancamentos.splice(index, 1);
        this.setState({ lancamentos: lancamentos, showConfirmDialog: false });
        messages.mensagemSucesso("Lançamento excluído com sucesso");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu erro ao tentar excluir lançamento");
      });
  };

  cadastraLancamento = () => {
    this.props.history.push("/cadastro-lancamentos");
  };

  render() {
    const meses = this.service.obterListaMeses();
    const tipos = this.service.obterListaTipos();

    const confirmDialogFooter = (
      <div>
        <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
        <Button
          label="Não"
          icon="pi pi-times"
          onClick={this.cancelaDelecao}
          className="p-button-text"
          autoFocus
        />
      </div>
    );
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
              <button
                type="button"
                onClick={this.cadastraLancamento}
                className="btn btn-danger"
              >
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
                deleteAction={this.abrirConfirmacao}
              />
            </div>
          </div>
        </div>
        <div>
          <Dialog
            header="Confirmação"
            visible={this.state.showConfirmDialog}
            style={{ width: "50vw" }}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            <p className="m-0">Confirma a exclusão desse lançamento</p>
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamento);
