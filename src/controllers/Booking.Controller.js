import Booking from "../models/Booking.Model.js";

export default class BookingController {
    static async createBooking(req, res) {
        try{
            const bookingData = req.body;
        const result = await Booking.create(bookingData);
        return result.success ? res.status(201).json(result) :  res.status(400).json(result);
        }catch(error){
            res.status(500).json({ success: false, message: "Error al crear la reserva." });
        }   
    }  
    static async getAllBookings(req, res){
        try {
            const bookings = await Booking.getAll();
            return bookings.success ? res.status(200).json(bookings) : res.status(404).json(bookings);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener las reservas." });
        }   
    }
    static async getBookingById(req, res){
        try {
            const booking = await Booking.getBookingById(req.params.id);
            return booking.success ? res.status(200).json(booking) : res.status(404).json(booking);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener la reserva." });
        }   
    }
    static async updateStatus(req, res){
        try {
            const { id } = req.params;
            const { status } = req.body;
            const result = await Booking.updateStatus(id, status);
            return result.success ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al actualizar el estado de la reserva." });
        }   
    }
    static async updateQrCode(req, res){
        try {
            const { id } = req.params;
            const { codigo_qr } = req.body;
            const result = await Booking.updateQrCode(id, codigo_qr);
            return result.success ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al actualizar el código QR de la reserva." });
        }
    }
    static async searchBookingsByClientId(req, res){
        try {
            const { clientId } = req.params;
            const bookings = await Booking.searchBookingsByClientId(clientId);
            return bookings.success ? res.status(200).json(bookings) : res.status(404).json(bookings);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al buscar las reservas del cliente." });
        }
    }
}