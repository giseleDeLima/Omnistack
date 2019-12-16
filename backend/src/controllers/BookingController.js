const Booking = require('../models/Booking');

module.exports = {
    async store(req, res)
    {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });  
        
        //populate - ou seja eu vou popular um relacionamento ao invez de trazer o id
        //vou popular o relacionamento de spot e de user, e no final dou um execPopulate para execuar a população do relacio.
        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectdUsers[booking.spot.user];

        //Se existir uma conexão com esse cara
        if(ownerSocket){
            //req.io é a variavel que deixamos disponivel para todas as rotas no arquivo server.js
            //método to que é para quem eu desejo enviar essa msg 
            //emit emitir a msg, booking_request é o nome da msg + booking que é todo o objt de booking
            req.io.to(ownerSocket).emit('booking_request', booking);
        }
        
        return res.json(booking);
    }
};