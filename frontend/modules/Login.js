import validator from "validator";
export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.errors = [];
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');

    this.errors = []; // Clear errors before validating again

    if (!validator.isEmail(emailInput.value)) {
      this.errors.push("E-mail inválido!");
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      this.errors.push("Senha precisa ter entre 3 e 50 caracteres");
    }

    const errorContainer = document.querySelector(".error-messages");
    const divDoAlert = document.querySelector(".divDoAlert"); // Adicione um ponto para selecionar por classe
    
    if (this.errors.length > 0) {
      // Exibir mensagens de erro
      errorContainer.innerHTML = this.errors.join("<br>"); // Exibir erros como uma lista
      divDoAlert.classList.add("alert", "alert-danger"); // Adicionar as classes Bootstrap
      errorContainer.style.display = "block"; // Mostrar o container de mensagens de erro
    } else {
      // Esconder mensagens de erro e enviar o formulário se não houver erros
      errorContainer.style.display = "none"; // Esconder o container de mensagens de erro
      divDoAlert.classList.remove("alert", "alert-danger"); // Remover as classes Bootstrap
      el.submit();
    }
    
  }
}
