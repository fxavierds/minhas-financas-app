import ApiService from "../service";

export default class LancamentoService extends ApiService {
  constructor() {
    super("api/lancamentos");
  }

  consultar(lancamentoFiltro) {
    let params = `?ano=${lancamentoFiltro.ano}`;

    if (lancamentoFiltro.tipo) {
      params = `${params}&tipo=${lancamentoFiltro.tipo}`;
    }

    if (lancamentoFiltro.mes) {
      params = `${params}&mes=${lancamentoFiltro.mes}`;
    }

    if (lancamentoFiltro.status) {
      params = `${params}&status=${lancamentoFiltro.status}`;
    }

    return this.get(params);
  }
}
