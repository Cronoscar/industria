import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getConnection , sql} from "../utils/db.js";
import categoryRouter from "./routes/Category.Routes.js";
import commerceRouter from "./routes/Commerce.Routes.js";
import customerRouter from "./routes/Customer.Routes.js";
import parkingSpotRouter from "./routes/ParkingSpot.Routes.js";
import personRouter from "./routes/Person.Routes.js";
import branchRouter from "./routes/Branch.Routes.js";
import authRouter from "./routes/Auth.Routes.js";
import bookingRouter from "./routes/Booking.Routes.js";
import commentRouter from "./routes/Comment.Routes.js";
import favoriteRouter from "./routes/Favorite.Routes.js";
import recordRouter from "./routes/Record.Routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './../swagger_output.json' with { type: 'json' };

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const FRONT_END_ORIGIN = process.env.FRONT_END_ORIGIN;

const corsOptions = {
  origin: FRONT_END_ORIGIN,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

// definimos la url para la documentación de la api
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// aqui enlazamos todos los routers a la ruta base de los controladores
app.use("/api", personRouter);
app.use("/api", categoryRouter);
app.use("/api", customerRouter);
app.use("/api", commerceRouter);
app.use("/api", parkingSpotRouter);
app.use("/api", authRouter)
app.use("/api", branchRouter);
app.use("/api", bookingRouter);
app.use("/api", commentRouter);
app.use("/api", favoriteRouter);
app.use("/api", recordRouter);

app.get("/api/version", (req, res) => {
  res.send("0.3.0");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
}); 
// try {
//     const db = await getConnection();
//     console.log("Database connected");
//     console.log(await db.request().query("SELECT a.ID_Sucursal,a.Ubicacion,a.Espacios_Disponibles,a.Espacios_Totales,a.Limite_Hora_Parqueo, a.Precio_parqueo,b.ID_Comercio,b.Nombre FROM trade.tblSucursales as a , trade.tblComercios as b where a.ID_Comercio = b.ID_Comercio;"));
// } catch (error) {
//     console.error("Database connection failed:", error);
// }

export default app;