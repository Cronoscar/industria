import express from "express";
import dotenv from "dotenv";
import { getConnection ,sql} from "../utils/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT ;
app.get("/", (req, res) => {
  res.send("Hello World!");
  
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
}); 

try {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT  a.ID, a.Nombre,a.Apellido,b.Vehiculo FROM users.tblPersonas as a, users.tblClientes as b WHERE a.ID=b.ID_CLIENTE");
  console.log(result.recordset);
} catch (error) {
  console.error("Error executing query:", error);
}
export default app;