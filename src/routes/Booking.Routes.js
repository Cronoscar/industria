import { Router } from "express";
import BookingController from "../controllers/Booking.Controller.js";

const bookingRouter = Router();
bookingRouter.post('/bookings', BookingController.createBooking);
bookingRouter.get('/bookings', BookingController.getAllBookings);
bookingRouter.get('/bookings/:id', BookingController.getBookingById);
bookingRouter.put('/bookings/:id', BookingController.updateStatus);
bookingRouter.put('/bookings/:id/qr', BookingController.updateQrCode);
export default bookingRouter;