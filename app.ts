import express from "express";
import bodyParser from "body-parser";
import { router as cat } from "./api/cat";
import { router as index } from "./api/index";

export const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", cat);
// app.use("/register", cat);