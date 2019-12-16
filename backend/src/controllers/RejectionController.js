const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){

        //booking_id é um parametro vem da rota
        //routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');
        booking.approved = false;

        await booking.save();

        const bookingUserSocket = req.connectdUsers[booking.user];
       
        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}