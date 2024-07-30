import localStorageService from "./localStorageService";
import jwt from 'jsonwebtoken';
import ApiService from "../service";

export const USUARIO_LOGADO = "_usuario_logado";
export const TOKEN = "acess_token";

export default class authService {
    static isUsuarioAutenticado(){
        const token = localStorageService.obterItem(TOKEN);
        const decodeToken = jwt.decode(token);
        const expiration = decodeToken.exp;
        const isTokenInValido = Date.now() >= (expiration * 1000);

        return !isTokenInValido;
    }

    static removerUsuarioAutenticado(){
        localStorageService.removerItem(USUARIO_LOGADO);
        localStorageService.removerItem(TOKEN);
    }

    static logar(usuario, token){
        localStorageService.adicionarItem(USUARIO_LOGADO, usuario);
        localStorageService.adicionarItem(TOKEN, token);
        ApiService.registrarToken(token);
    }

    static obterUsuarioAutenticado(){
        return localStorageService.obterItem(USUARIO_LOGADO);
    }

    static refreshSession(){
        const token = localStorageService.obterItem(TOKEN);
        const usuario = authService.obterUsuarioAutenticado();
       
        authService.logar(usuario, token);
        return usuario;
    }
}