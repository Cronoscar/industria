import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

// Configuración de la conexión a SQL Server
const dbConfig = {
  user: process.env.DB_USER || "industria",
  password: process.env.DB_PASS || "industria123",
  server: process.env.DB_SERVER || "localhost", // Cambia si usas otro host o instancia
  database: process.env.DB_NAME || "prueba",
  options: {
    encrypt: false, // Si usas Azure ponlo en true
    trustServerCertificate: true, // Necesario para entornos locales
  },
};

// Crear un pool de conexión global
let pool;

export const getConnection = async () => {
  try {
    if (pool) {
      // Reusar el pool existente si ya está conectado
      return pool;
    }
    pool = await sql.connect(dbConfig);
    console.log("✅ Conexión exitosa a SQL Server (base de datos 'prueba')");
    return pool;
  } catch (error) {
    console.error("❌ Error al conectar con SQL Server:", error.message);
    throw error;
  }
};

export { sql };
