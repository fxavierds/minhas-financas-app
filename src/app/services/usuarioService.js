import ApiService from "../service";
import erroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService {
  constructor() {
    super("api/usuarios");
  }

  autenticar(credenciais) {
    return this.post("/autenticar", credenciais);
  }

  obterPorUsuario(id) {
    return this.get(`/${id}/saldo`);
  }

  salvar(usuario) {
    return this.post("", usuario);
  }

  validar(usuario) {
    const erros = [];

    if (!usuario.nome) {
      erros.push("O campo nome é obrigatório");
    }

    if (!usuario.email) {
      erros.push("O campo email é obrigatório");
    } else if (
      usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)
    ) {
      erros.push("Informe um email válido");
    }

    if (!usuario.senha || !usuario.senhaRepeticao) {
      erros.push("Digite a senha 2x");
    } else if (usuario.senha !== usuario.senhaRepeticao) {
      erros.push("As senhas não batem");
    }

    if (erros && erros.length > 0) {
      throw new erroValidacao(erros);
    }
  }
}

export default UsuarioService;
