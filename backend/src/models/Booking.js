const mongoose = require('mongoose');

//Temos dois relacionamentos dentro do Booking, a reserva é feita por um usuário e essa reserva é para spot

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

//Exportar esse model aqui de dentro, eu defino o nome da table e sua estrutura
module.exports = mongoose.model('Booking', BookingSchema);