import express from "express";
import { connectMongo } from "./database/config.js";
import "dotenv/config";
import cors from "cors";
// import mongoose from "mongoose";
import { schoolRouter } from "./routes/v1/schoolRouter.js";
import { collectionRouter } from "./routes/v1/collectionRouter.js";
// import { getSchools } from "./controllers/schoolController.js";

const app = express();

const PORT = process.env.PORT || 3000;

connectMongo();

app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5371",
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5371");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
// });

app.get("/", (req, res) => {
  res.json({
    success: true,
    data: "This is the data that will be diplayed",
  });
});
// console.log(process.env.CONNECTION_STRING);
app.use("/api", schoolRouter, collectionRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
