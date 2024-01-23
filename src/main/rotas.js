import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import authService from "../app/services/authService";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


function RotaAutenticada({component: Component, ...props}){
  return (
    <Route { ...props} render={(componentProps) => {
        if(authService.isUsuarioAutenticado()){
          return(
            <Component {...componentProps}/>
          )
        } else {
          
          return(
            <Redirect to={{pathname: "/login", state: { from: componentProps.location}}}/>
          )
        }
    }}/>
  )
}

function Rotas() { 
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        
        <RotaAutenticada path="/cadastro-usuarios" component={CadastroUsuario} />
        <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos} />
        <RotaAutenticada
          path="/cadastro-lancamentos/:id?"
          component={CadastroLancamentos}
        />
      </Switch>
    </HashRouter>
  );
}

export default Rotas;
