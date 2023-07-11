import React from "react";
import Card from "../../components/cards";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/formgroup";

class CadastroLancamento extends React.Component {
  render() {
    return (
      <Card>
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao1" label="Descrição">
              <input id="inputDescricao" type="text" className="form-control" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputAno" label="Ano">
              <input id="inputAno" type="text" className="form-control" />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputMes" label="Mês">
              <input id="inputMes" type="text" className="form-control" />
            </FormGroup>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamento);
