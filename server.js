// variaveis de ambiente que ficam ocultas
require("dotenv").config();

const express = require("express");
const app = express();

// serve para modelar a base de dados
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Agora que a conexão ocorreu"))
  .then(() => {
    console.log("Conectei a base de dados");
    app.emit("pronto");
  })
  .catch((e) => console.log(e));

// identificar o navegador do cliente atraves do cookie
const session = require("express-session");
// é para falar que as sessoes vao ser salva na base de dados
const MongoStore = require("connect-mongo")(session);
// são mensagens auto destrutivas
const flash = require("connect-flash");
// serve para controlar as rotas
const routes = require("./routes");
// serve para trabalhar com caminhos seja por dirname ou filename
const path = require("path");
// const helmet = require("helmet");
// app.use(helmet.referrerPolicy({ policy: ["origin", "unsafe-url"] }));


// todo formulario precisa ter um csrf token garantindo a segurnca
// do site fazendo com que ninguem consigo postar algo dentro do site
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

// app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "afjaskfja",
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// configuração do csrf
app.use(csrf());
//nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
// chamando as rotas
app.use(routes);

// evento quando o banco de dados é iniciado
app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("Servidor executando na porta 3000");
  });
});
