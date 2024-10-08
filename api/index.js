import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware para CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Cambia a tu frontend en producción
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.options("http://localhost:5173", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
});

// Configuración de CORS para permitir solicitudes de localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", // Aquí especificamos el origen que queremos permitir
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Permitir cookies y encabezados relacionados
  })
);


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);




app.listen(8800, () => {
  console.log("Connected!");
});
