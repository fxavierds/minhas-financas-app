import React from "react";
import AuthService from "../app/services/authService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{
    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({usuarioAutenticado: usuario, isAutenticado: true});
    }

    encerrarSessao = (usuario) => {
        AuthService.removerUsuarioAutenticado(usuario);
        this.setState({usuarioAutenticado: null, isAutenticado: false});
    }

    render(){
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao                
        }
        return(           
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }

}

export default ProvedorAutenticacao;