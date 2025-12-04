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
import payRouter from "./routes/Pay.Routes.js";
import CEOCommerceRouter from "./routes/CEOCommerce.Routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './../swagger_output.json' with { type: 'json' };

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: '*',
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
app.use("/api", payRouter);
app.use("/api", CEOCommerceRouter);
app.get("/api/version", (req, res) => {
  res.send("0.3.0");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
}); 
// try {
//     const db = await getConnection();
//     console.log("Database connected");
//     console.log(await db.request().query( `SELECT *
//                 FROM trade.tblSucursales`));
// } catch (error) {
//     console.error("Database connection failed:", error);
// }

export default app;