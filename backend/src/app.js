import express from "express";
const app = express();
import cors from "cors";

app.use(cors());

// common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes import
import dashboardRouter from "./routes/dashboard.routes.js";

//main route
app.use("/dashboard", dashboardRouter);

export { app };
