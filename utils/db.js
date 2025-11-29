import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASS  ,
  server: process.env.DB_SERVER , 
  port: 1433,
  database: process.env.DB_NAME  ,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
};

let pool;

export  const getConnection = async () => {
  try {
    if (pool) {
      return pool;
    }
    pool = await sql.connect(dbConfig);
    console.info(` Conexión exitosa a ${process.env.DB_SERVER} --> ${process.env.DB_NAME}`);
    return pool;
  } catch (error) {
    console.error(" Error al conectar con SQL Server:", error.message);
    throw error;
  }
};

export { sql };
