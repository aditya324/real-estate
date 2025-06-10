import express from "express";

import dotenv from "dotenv";

import bodyParser from "body-parser";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import { authMiddleware } from "./middleware/authMiddleware";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import tenantRoutes from "./routes/tenetRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.use("/tenants",  propertyRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
app.use("/properties", authMiddleware(["manager"]), managerRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
