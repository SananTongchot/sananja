import express from "express";
import bodyParser from "body-parser";
import { router as cat } from "./api/cat";
import { router as remove } from "./api/remove";
import {router as add} from "./api/add";
import cors from "cors";

export const app = express();

// ให้ cors() ทำการกำหนดค่าและเรียก middleware
app.use(cors({
    origin: "*",
}));

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", cat);
app.use("/register", cat);
app.use("/remove", remove);
app.use("/addcat", add);
