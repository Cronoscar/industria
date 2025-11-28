import Booking from "../models/Booking.Model";

export default class BookingController {
    static async createBooking(req, res) {
        const bookingData = req.body;
        const result = await Booking.create(bookingData);
        res.json(result);
    }  
}