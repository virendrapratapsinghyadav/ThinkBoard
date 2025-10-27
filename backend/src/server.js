import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { dbConnect } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import rateLimiter from "./middlewares/rateLimiter.js";
dotenv.config();
import cors from "cors";

const app = express();
if(process.env.NODE_ENV !== "production"){
    app.use(cors());
}
app.use(express.json());
app.use(rateLimiter);

const __dirname = path.resolve();

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch(() => {
    console.log("Failed to connect DB");
  });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
