import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventsRouter from "./routes/events";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/events", eventsRouter);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server Error" });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
