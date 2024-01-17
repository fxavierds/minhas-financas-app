import localStorageService from "./localStorageService";

export const USUARIO_LOGADO = "_usuario_logado";

export default class authService {
    static isUsuarioAutenticado(){
        const usuario = localStorageService.obterItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        localStorageService.removerItem(USUARIO_LOGADO);
    }
}