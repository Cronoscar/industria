import { Router } from "express";
import BookingController from "../controllers/Booking.Controller.js";

const bookingRouter = Router();
bookingRouter.post('/bookings', BookingController.createBooking);
bookingRouter.get('/bookings', BookingController.getAllBookings);
bookingRouter.get('/bookings/:id', BookingController.getBookingById);
bookingRouter.put('/bookings/:id', BookingController.updateStatus);
bookingRouter.put('/bookings/:id/qr', BookingController.updateQrCode);
bookingRouter.get('/bookings/client/:clientId', BookingController.searchBookingsByClientId);
bookingRouter.post('/bookings/verify/:idBooking', BookingController.verifyQrCode);
bookingRouter.get('/bookings/branch/:commerceID/:branchID', BookingController.getAllBookingsbyBranch);
bookingRouter.get('/bookings/commerce/:commerceID', BookingController.getAllBookingsbyCommerce);
export default bookingRouter;