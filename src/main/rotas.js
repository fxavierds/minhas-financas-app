import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" Component={Login} />
        <Route path="/cadastro-usuarios" Component={CadastroUsuario} />
      </Switch>
    </HashRouter>
  );
}

export default Rotas;
