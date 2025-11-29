import { getConnection } from "../database/connection.js";
const db = await getConnection();
export default class BranchModel {
    #name;
    #location;
    #availableSpots;
    #totalSpots;
    #hourlyPrice;
    #reservationPrice;
    #parkingTimeLimit;
    #commerceID;

    constructor(name,location,availableSpots,totalSpots,hourlyPrice,reservationPrice,parkingTimeLimit,commerceID = null) {
        this.#name = name;
        this.#location = location;
        this.#availableSpots = availableSpots;
        this.#totalSpots = totalSpots;
        this.#hourlyPrice = hourlyPrice;
        this.#reservationPrice = reservationPrice;
        this.#parkingTimeLimit = parkingTimeLimit;
        this.#commerceID = commerceID;
    }

    static getAll(){
        const result = db.request()
        .query("SELECT a.ID_Sucursal,a.Ubicacion,a.Espacios_Disponibles,a.Espacios_Totales,a.Limite_Hora_Parqueo, a.Precio_parqueo,b.ID_Comercio,b.Nombre FROM trade.tblSucursales as a , trade.tblComercios as b where a.ID_Comercio = b.ID_Comercio;");
        return  result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "Sucursal no encontrada." };

    }

    static getById(id){
        const result = db.request()
        .input("ID_Sucursal",id)
        .query("SELECT a.ID_Sucursal,a.Ubicacion,a.Espacios_Disponibles,a.Espacios_Totales,a.Limite_Hora_Parqueo, a.Precio_parqueo,b.ID_Comercio,b.Nombre FROM trade.tblSucursales as a , trade.tblComercios as b where a.ID_Comercio = b.ID_Comercio and a.ID_Sucursal = @ID_Sucursal;");
        return result.recordset[0];
    }

    static update(id, personData){

    }

    static disable(id){
        const result = db.request()
        .input("ID_Sucursal",id)
        .query("Update trade.tblSucursales set Activo = 0 where ID_Sucursal = @ID_Sucursal;");
        return result.rowsAffected[0] > 0 ? { success: true, message: "Sucursal desactivada correctamente." } : { success: false, message: "No se pudo desactivar la Sucursal." };
    }
}

// CREATE TABLE trade.tblSucursales (
//     ID_Sucursal INT IDENTITY(1,1) PRIMARY KEY,
//     Nombre NVARCHAR(150) NOT NULL,
//     Ubicacion NVARCHAR(255),
//     Espacios_Disponibles INT,
//     Espacios_Totales INT,
//     Precio_por_hora DECIMAL(10,2),
//     Precio_reserva DECIMAL(10,2),
//     Limite_Hora_Parqueo DECIMAL(10,2),
//     ID_Comercio INT NOT NULL,
//     FOREIGN KEY (ID_Comercio) REFERENCES trade.tblComercios(ID_Comercio)
// );