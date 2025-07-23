import express from "express";
const app = express();
import cors from "cors";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes import
import dashboardRouter from "./routes/dashboard.routes.js";

//mac test route
app.use("/api/v1/mac-check", dashboardRouter);

export { app };
