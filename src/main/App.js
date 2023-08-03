import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import NavBar from "../components/navBar";
import { Button } from "primereact/button";

import "toastr/build/toastr.min.js";
import "../custom.css";
import "toastr/build/toastr.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Rotas from "./rotas";

function App() {
  return (
    <>
      <NavBar />
      <Button icon="pi pi-check" />
      <div className="container">
        <Rotas />
      </div>
    </>
  );
}

export default App;
