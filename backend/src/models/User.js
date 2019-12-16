//Importar o mongoose de dentro do pacote mongoose
const mongoose = require('mongoose');

//Schema do nosso usuário a estrutura da nossa table usuário, quais campos o usuário vai ter, 
//quais são os tipos desses campos
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//Exportar esse model aqui de dentro, eu defino o nome da table e sua estrutura
module.exports = mongoose.model('User', UserSchema);