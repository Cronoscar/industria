import { getConnection } from "../../utils/db.js";
const db = await getConnection();

export default class Booking {

    static async create(bookingData){
        const result= await db.request()
        .input("id_cliente",bookingData.id_cliente)
        .input("id_espacio",bookingData.id_espacio)
        .input("hora_inicio",bookingData.hora_inicio)
        .input("hora_final",bookingData.hora_final)
        .input("monto",bookingData.monto)
        .input("codigo_qr",bookingData.codigo_qr)
        .query("INSERT INTO parking.tblReservas (ID_Cliente, ID_Espacio, Hora_Inicio, Hora_Final, Monto, Codigo_QR) VALUES (@id_cliente, @id_espacio, @hora_inicio, @hora_final, @monto, @codigo_qr)");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Reserva creada correctamente." } : { success: false, message: "No se pudo crear la reserva." };
    }



}
















//         CREATE TABLE parking.tblReservas (
//     ID_Reserva INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Cliente INT NOT NULL,
//     ID_Espacio INT NOT NULL,
//     Hora_Inicio DATETIME NOT NULL,
//     Hora_Final DATETIME NOT NULL,
//     Estado NVARCHAR(20) CHECK (Estado IN ('activa','cancelada','finalizada')) DEFAULT 'activa',
//     Monto DECIMAL(10,2),
//     Fecha_de_creacion DATETIME DEFAULT GETDATE(),
//     Codigo_QR NVARCHAR(255),
//     FOREIGN KEY (ID_Cliente) REFERENCES users.tblClientes(ID_Cliente),
//     FOREIGN KEY (ID_Espacio) REFERENCES parking.tblEspacios_de_Parqueo(ID_Espacio)
// );