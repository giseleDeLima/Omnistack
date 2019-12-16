const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
  async index(req, res){ //Listagem de recurso 
    const {tech} = req.query;

    //find - encontrar vários
    const spots = await Spot.find({techs: tech});
    return res.json(spots);


  },

  async store(req, res){
      //Estou buscanco a palavra filename dentro da requisição com nome file.
      const { filename } = req.file;
      const { company, techs, price } = req.body;
      const { user_id } = req.headers;

      const user = await User.findById(user_id);

      if(!user)
      {
          return res.status(400).json({error: 'Usuário não existe'});
      }

      //Como eu sei qual o usuário que esta criando essa requisição? quando criamos o usuário ele possui um id, poderiamos
      //até enviar esse id enviar na hora de fazer essa requisição, porem geralmente esse tipo de informação não enviamos
      //no corpo da requisição pois essa é uma informação que talvez enviareamos em todas nossas requisições, utilizamos o 
      //header o cabeçalho 

      //parametro techs - o techs irá vir como string da requisição e o banco de dados espera um 
      //array então temos que transformar isso em array.
      //techs.split(',').map(tech => tech.trim()) = vou cortar minha string em pedaços separados pela virgula, mas podemos
      //ter um espaço em branco na requisição, então para remover esse espaço realizamos uma função map onde iremos percorrer
      //este array da seguinte forma: para uma das techs (tecnlogias) eu vou realizar um tech.trim onde será retirado o 
      //espaço em branco antes e depois de uma string.

      //Resumindo ele vai quebrar minha string em array com base na virgula e percorrer este array tech e retirar os espaços

    
      
      const spot = await Spot.create({
          user: user_id,
          thumbnail:filename,
          company,
          techs: techs.split(',').map(tech => tech.trim()),
          price
      })

      return res.json(spot);
  }  
};