//Importa o express
const express = require('express');

//Importar mongoose para trabalhar com dados no mongodb, quando precisar editar, deletar... vamos utilizar ele
const mongoose = require('mongoose');

//CORS- uma depencia para poder acessar a API
const cors = require('cors');
const path = require('path');

//Socket.io é uma ferramenta assim como express que vai abstrair algumas funcionalidades do protocolo web socket 
//que é implementado pelo node para termos uma api uma forma de programar essa parte de tempo real mais amigavel
//então ele já traz várias funcionalidades de forma bem legal de utilizarque vai facilitar o desenvolvimento
//da nossa aplicação 

//Precisamos permitir que o nosso servidor ouça tanto o protocolo HTTP e o protocolo web socket, são 
//dois protocolos de comunicação diferente 
//HTTP protocolom mais assincrono envia uma requisição e espero uma resposta 
//web socket - um protocolo mais sincrono recebe e devolve respostas sem precisar fazer novas requisições
const socketio = require('socket.io');
const http = require('http');


//Importar as rotas (do arquivo routes.js) colocar o ./ porque se não ele pode procurar um módulo ou 
//dependencia chamado routes, o ponto ./ significa na mesma pasta
const routes = require('./routes');

const app = express();
//Basicamente estou pegando nosso servidor http e estou extraindo ele de denttro do meu express
const server = http.Server(app);
//Server começa a ouvir o protocolo websocket
const io = socketio(server); //Envia ou recebe msg do back para front e front para o back


//Conectando com o servidor e banco de dados 
//teste:teste = substitui por usuário e senha 
//aircnc = substituir pelo nome do banco de dados 
mongoose.connect('mongodb+srv://oministack:oministack@oministack-immng.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true, //Colocar essas duas linhas para não dar erro 
    useUnifiedTopology:true,
});

//Obj vazio
const connectdUsers = {};

//Estou ouvindo toda conexão (todo usuário que se logar na aplicação) e a variavel socket representa a conexão
//que eu tenho com esse usuário
io.on('connection', socket => {
       
    const { user_id } = socket.handshake.query;
    //Precisamos fazer um relacionamento desse socket_id com o usuário conectado
    //A chave dessa variavel será user_id eo valor socket.id
    connectdUsers[user_id] = socket.id;
   
});

//Precisamos deixar disponivel a variavel connectdUsers disponivel para toda aplicação
//o método use é para adicionar uma funcionalidade para todas as rotas independente se for get, post...
//como é uma funcionalidade que não retorna nenhuma resposta para o usuário final recebemos mais um 
//parametro que se chama next, next é uma função que quando chamarmos essa função quer dizer que queremos
//continuar o fluxo normal da aplicação, então como esse função será executada antes das rotas no final dessa
//funcionalidade de adicionar essa variavle para todas as rotas da aplicação, eu vou chamar o next para 
//continuar com o restante do fluxo, se não chamar o next a aplicação para aqui, minha aplicação nunca
//chegará nas rotas mais abaixo
app.use((req, res, next) => {
    req.io = io; //Como todas minhas rotas tem acesso a req todas terão acesso ao protocolo de comunicação
    req.connectdUsers = connectdUsers;

    return next(); //Continua o fluxo normal da aplicação, sem este a aplicação ficará sempre aqui dentro
});


//app.use(cors({ origin: 'http://localhost:3333'})); Apenas o localhost:3333 pode acessar
//Qualquer endereço pode acessar
app.use(cors());


//O express não reconhece uma requisição vinda em um padrão em um formato de json, 
//então precisamos dizer que as requisições utilizaram este formato.
app.use(express.json());

//Rota para retornar imagem, esta é a forma que o express utiliza para trabalhar com uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

//Este comando precisa vir depois do comando acima, estou importando as rotas
app.use(routes);

server.listen(3333);


 //Emitindo uma mensagem para o front
    //setTimeout porque pode demorar um pouco isso é do javascript, no exemplo 4000 ou seja 4 segundos
    // setTimeout(() => {
    //     socket.emit('message', 'Uma msg qualquer');
    // }, 4000)