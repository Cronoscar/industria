import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

// Configuración de conexión a SQL Server
const dbConfig = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASS  ,
  server: process.env.DB_SERVER , 
  port: 1433,
  database: process.env.DB_NAME  ,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    // instanceName: 'SQLEXPRESS', // Dejar vacío si no usas una instancia
  },
};

// Crear un pool de conexión global
let pool;

export  const getConnection = async () => {
  try {
    if (pool) {
      // Reusar conexión existente
      return pool;
    }
    pool = await sql.connect(dbConfig);
    console.log(" Conexión exitosa a SQL Server (base de datos 'ProyectoSpotty')");
    return pool;
  } catch (error) {
    console.error(" Error al conectar con SQL Server:", error.message);
    throw error;
  }
};

export { sql };
