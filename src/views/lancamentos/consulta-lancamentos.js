import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/cards";
import FormGroup from "../../components/formgroup";
import SelectMenu from "../../components/selectMenu";
import Lancamentostable from "./lancamentostable";

class ConsultaLancamento extends React.Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
  };
  render() {
    const meses = [
      { label: "Selecione", value: "" },
      { label: "Janeiro", value: 1 },
      { label: "Fevereiro", value: 2 },
      { label: "Março", value: 3 },
      { label: "Abril", value: 4 },
      { label: "Maio", value: 5 },
      { label: "Junho", value: 6 },
      { label: "Julho", value: 7 },
      { label: "Agosto", value: 8 },
      { label: "Setembro", value: 9 },
      { label: "Outubro", value: 10 },
      { label: "Novembro", value: 11 },
      { label: "Dezembro", value: 12 },
    ];

    const tipos = [
      { label: "Selecione", value: "" },
      { label: "Despesa", value: "DESPESA" },
      { label: "Receita", value: "RECEITA" },
    ];

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
                  onChange={(e) => this.setState({ ano: e.target.value })}
                  lista={meses}
                ></SelectMenu>
              </FormGroup>
              <FormGroup htmlFor="inputTipo" label="Tipo:">
                <SelectMenu
                  id="inputTipo"
                  className="form-control"
                  value={this.state.tipo}
                  onChange={(e) => this.setState({ ano: e.target.value })}
                  lista={tipos}
                ></SelectMenu>
              </FormGroup>

              <button type="button" className="btn btn-success">
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
              <Lancamentostable />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamento);
