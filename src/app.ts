import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import sequelize from "./config/database/postgre-sql-database";
import router from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/", router);

const PORT = process.env.PORT || 3000;

async function startServer() {
  await sequelize.sync({ alter: true });
  console.log("Database connected and synced");

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
