import validator from "validator";
export default class Contato {
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
    const nomeInput = el.querySelector('input[name="nome"]');
    const emailInput = el.querySelector('input[name="email"]');
    const telefoneInput = el.querySelector('input[name="telefone"]');

    this.errors = []; // Clear errors before validating again

    if (!nomeInput.value.length > 0) {
      this.errors.push("Nome é um campo obrigatório");
    }
    if (emailInput.value.length> 0 && !validator.isEmail(emailInput.value)) {
      this.errors.push("E-mail inválido!");
    }

    if (!emailInput.value.length > 0 && !telefoneInput.value.length > 0) {
      this.errors.push(
        "Pelo menos um contato precisa ser enviado: E-mail ou telefone."
      );
    }

    const errorContainer = document.querySelector(".error-messages");
    const divDoAlert = document.querySelector(".divDoAlert"); // Adicione um ponto para selecionar por classe

    if (this.errors.length > 0) {
      // Exibir mensagens de erro
      errorContainer.innerHTML = this.errors.join("<br>"); // Exibir erros como uma lista
      divDoAlert.classList.add("alert", "alert-danger"); // Adicionar as classes Bootstrap
      errorContainer.style.display = "block"; // Mostrar o container de mensagens de erro
    
      // Adicione este código para ocultar a mensagem após 7 segundos
      setTimeout(function () {
        errorContainer.style.display = "none"; // Ocultar o container de mensagens de erro
        divDoAlert.classList.remove("alert", "alert-danger"); // Remover as classes Bootstrap após 7 segundos
      }, 3000); // 7000 milissegundos = 7 segundos
    } else {
      // Esconder mensagens de erro e enviar o formulário se não houver erros
      errorContainer.style.display = "none"; // Esconder o container de mensagens de erro
      divDoAlert.classList.remove("alert", "alert-danger"); // Remover as classes Bootstrap
      el.submit();
    }
  }
}
