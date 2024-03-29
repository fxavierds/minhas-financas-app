import React from "react";
import currencyformatter from "currency-formatter";

export default (props) => {
  const rows = props.lancamentos.map((lancamento) => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>
          {currencyformatter.format(lancamento.valor, { locale: "pt-Br" })}
        </td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
          <button
            onClick={(e) => props.alterarStatus(lancamento, "EFETIVADO")}
            type="button"
            disabled={lancamento.status !== "PENDENTE"}
            title="Efetivar"
            className="btn btn-success"
          >
            <i className="pi pi-check"></i>
          </button>
          <button
            onClick={(e) => props.alterarStatus(lancamento, "CANCELADO")}
            type="button"
            disabled={lancamento.status !== "PENDENTE"}
            title="Cancelar"
            className="btn btn-warning"
          >
            <i className="pi pi-times"></i>
          </button>
          <button
            onClick={(e) => props.editAction(lancamento.id)}
            type="button"
            title="Editar"
            className="btn btn-primary"
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            onClick={(e) => props.deleteAction(lancamento)}
            type="button"
            title="Excluir"
            className="btn btn-danger"
          >
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
