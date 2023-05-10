import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../components/cards";
import formGroup from "../components/formgroup";

class ConsultaLancamento extends React.Component {
  render() {
    return (
      <Card title="Consulta Lançamento">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <formGroup htmlFor="inputAno" label="Ano:">
                <input
                  type="text"
                  class="form-control"
                  id="inputAno"
                  aria-describedby="emailHelp"
                  placeholder="Digite o ano"
                />
              </formGroup>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamento);
