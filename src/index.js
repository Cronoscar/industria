import express from "express";
import dotenv from "dotenv";
import { getConnection , sql} from "../utils/db.js";
import categoryRouter from "./routes/Category.Routes.js";
import commerceRouter from "./routes/Commerce.Routes.js";
import customerRouter from "./routes/Customer.Routes.js";
import parkingSpotRouter from "./routes/ParkingSpot.Routes.js";
import personRouter from "./routes/Person.Routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './../swagger_output.json' with { type: 'json' };
import authRouter from "./routes/Auth.Routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// definimos la url para la documentación de la api
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// aqui enlazamos todos los routers a la ruta base de los controladores
app.use("/api", personRouter);
app.use("/api", categoryRouter);
app.use("/api", customerRouter);
app.use("/api", commerceRouter);
app.use("/api", parkingSpotRouter);
app.use("/api", authRouter)

app.get("/api/version", (req, res) => {
  res.send("0.1.0");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
}); 

// try {
//   const pool = await getConnection();
//   const result = await pool.request().query("SELECT  a.ID, a.Nombre,a.Apellido,b.Vehiculo FROM users.tblPersonas as a, users.tblClientes as b WHERE a.ID=b.ID_CLIENTE");
//   console.log(result.recordset);
// } catch (error) {
//   console.error("Error executing query:", error);
// }
export default app;