import Login from "../views/login";
import "bootswatch/dist/flatly/bootstrap.css";
import "../custom.css";
import CadastroUsuario from "../views/cadastroUsuario";

function App() {
  return (
    <div>
      <Login />
      <CadastroUsuario></CadastroUsuario>
    </div>
  );
}

export default App;
