//Importa o mongoose
var mongoose = require("mongoose");

//Cria a conexao com o banco
var mongoDB = 'mongodb://localhost/imob';
mongoose.connect(mongoDB);

//Configura para utilizar promises  (async)
mongoose.Promise = global.Promise;

//Recebe a conexao
var db = mongoose.connection;

//Cria notificacao de erros de conexao
db.on('error', console.error.bind(console, 'Erro de conexao do MongoDB: '));