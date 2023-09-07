import "core-js/stable";
import "regenerator-runtime/runtime";

// import "./assets/css/style.css";
import Login from "./modules/Login";
const cadastro = new Login(".form-cadastro");
const login = new Login(".form-login");
cadastro.init()
login.init()

import Contato from "./modules/Contato";
const contato = new Contato(".form-contato");
contato.init();