import express from "express";
import dotenv from "dotenv";
import { getConnection , sql} from "../utils/db.js";
import personRouter from "./routes/PersonRoutes.js";
import categoryRouter from "./routes/CategoryRoutes.js";
import customerRouter from "./routes/Customer.Routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './../swagger_output.json' with { type: 'json' };


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// aqui enlazamos todos los routers a la ruta base de los controladores
app.use("/api/", personRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/customers", customerRouter);


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