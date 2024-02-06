import dotenv from "dotenv";
dotenv.config();

import express from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import colors from "colors";
import { dbConnect } from "./config/db.js";

import CategoryRouter from "./router/category.js";
import BookRouter from "./router/bookList.js";

import UserRoute from "./router/user.js";

const app = express();
const { NODE_ENV, PORT } = process.env;

// app general use

const corsOptions = {
  origin: "https://e-library-frontend-kgr0.onrender.com",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(helmet());
app.use(express.static("public"));

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// the first position is always the request while the second is the response
app.use("/users", UserRoute);
app.use("/categories", CategoryRouter);
app.use("/books", BookRouter);

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome To library management server",
  });
});



// we use req.body for post

app.all("*", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "error",
    message: "No Endpoint found",
  });
});

dbConnect()
  .then((res) => {
    console.log(`Database is connect`.bgCyan);
    const port = NODE_ENV === "production" ? PORT : 6600;
    app.listen(port, (err) => {
      if (err) {
        console.log("server", err);
        return;
      }

      console.log(
        `Server is running on port ${port} in ${NODE_ENV} environment`.green
      );
    });
  })
  .catch((err) => {
    console.log(`database error: ${err}`.magenta);
  });
