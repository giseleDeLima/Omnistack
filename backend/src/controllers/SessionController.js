const User = require('../models/User');


//Aqui dentro do controller ele pode apenas exportar um objeto, e dentro desse objeto vamos colocar todos os métodos que
//temos no nosso controller.
module.exports = {
    async store(req, res){

        //Recurso chamado desestruturação, a constante email vai receber o que vem no corpo da requisição com o mesmo nome
        //ou seja email, estou buscando a palavra email dentro do corpo da requisição
        const { email } = req.body;

        let user = await User.findOne({email});

        if(!user)
        {
            user = await User.create({email});
        }

        return res.json(user);

    }
};

//await - ele aguarda a instrução ser executada, mas toda vez que utilizamos o await dentro de uma função
//Precimos informar que esta função ela é assincrona - ou seja ela pode demorar um pouco para executar 

//O await só vai passar para a próxima linha quando essa execução acabar, neste exemplo quando acabar
//o cadastro no banco