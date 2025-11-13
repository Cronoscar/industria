export default class CommerceModel {
    #name;
    constructor(name,rtn,dni){
        this.name = name;
        this.rtn = rtn;
        this.dni = dni;
    }

    static getAll(){
    //obtener conexión a la base de datos

    }

    static getById(id){

    }

    static update(id, personData){

    }

    static delete(id){

    }
}

// CREATE TABLE trade.tblComercios (
//     ID_Comercio INT IDENTITY(1,1) PRIMARY KEY,
//     Nombre NVARCHAR(150) NOT NULL,
//     RTN NVARCHAR(20),
//     DNI_Representante INT,
//     FOREIGN KEY (DNI_Representante) REFERENCES users.tblRepresentantesCorporativos(ID_Representante)
// );