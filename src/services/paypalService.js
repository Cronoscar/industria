import paypal from "@paypal/checkout-server-sdk";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class PayPalService {
    constructor() {
        this.clientId = process.env.PAYPAL_CLIENT_ID;
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        this.environment = process.env.PAYPAL_MODE === 'live' 
            ? new paypal.core.LiveEnvironment(this.clientId, this.clientSecret)
            : new paypal.core.SandboxEnvironment(this.clientId, this.clientSecret);
        
        this.client = new paypal.core.PayPalHttpClient(this.environment);
    }

    // Método para crear una orden de PayPal
    async createOrder(paymentData) {
        try {
            const request = new paypal.orders.OrdersCreateRequest();
            
            request.requestBody({
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: paymentData.ID_Reserva.toString(),
                    description: `Reserva #${paymentData.ID_Reserva}`,
                    amount: {
                        currency_code: 'USD', // Cambia según tu moneda
                        value: paymentData.Monto.toString()
                    }
                }],
                application_context: {
                    return_url: 'https://Spotty.com/payment/success',
                    cancel_url: 'https://Spotty.com/payment/cancel',
                    brand_name: 'Spotty',
                    user_action: 'PAY_NOW',
                    shipping_preference: 'NO_SHIPPING'
                }
            });

            const response = await this.client.execute(request);
            return {
                success: true,
                orderId: response.result.id,
                links: response.result.links,
                status: response.result.status
            };
        } catch (error) {
            console.error('Error creando orden PayPal:', error);
            return { 
                success: false, 
                message: error.message || 'Error al crear orden de PayPal' 
            };
        }
    }

    // Método para capturar el pago
    async capturePayment(orderId) {
        try {
            const request = new paypal.orders.OrdersCaptureRequest(orderId);
            request.requestBody({});

            const response = await this.client.execute(request);
            
            return {
                success: true,
                captureId: response.result.id,
                status: response.result.status,
                payer: response.result.payer,
                purchase_units: response.result.purchase_units
            };
        } catch (error) {
            console.error('Error capturando pago PayPal:', error);
            return { 
                success: false, 
                message: error.message || 'Error al capturar pago' 
            };
        }
    }

    // Método para verificar el estado de un pago
    async verifyPayment(orderId) {
        try {
            const request = new paypal.orders.OrdersGetRequest(orderId);
            const response = await this.client.execute(request);
            
            return {
                success: true,
                status: response.result.status,
                details: response.result
            };
        } catch (error) {
            console.error('Error verificando pago PayPal:', error);
            return { 
                success: false, 
                message: error.message || 'Error al verificar pago' 
            };
        }
    }
}

export default new PayPalService();