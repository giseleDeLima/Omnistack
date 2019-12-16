//Importar o mongoose de dentro do pacote mongoose
const mongoose = require('mongoose');

//Estrutura da nossa table com as colunas
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],

    //Preciso informar qual usuário criou esse informação dentro do banco
    //Tipo ObjectId ou seja o ID criado no banco ao inserir o user
    //ref é a referencia para qual model é essa informação do ID
    //Então essa informação de Usuario esta se referindo a essa model 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: { //Configuração mongoose
        virtuals: true, //Toda vez que um spot for convertido em json, queremos que coloque os virtuals junto
    }
});


//Minha Virtual
//Toda vez que o spot for utilizado em alguma listagem, ele vai criar um campo que vai ser
//computado pelo javascript, ele não existe no banco mas ele vai ser criado pelo javascript
//dentro do mongo isso é chamado de virtual,com o this ele trara todos os campos os dados do spot
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`;
});

//Exportar esse model aqui de dentro, eu defino o nome da table e sua estrutura
module.exports = mongoose.model('Spot', SpotSchema);

