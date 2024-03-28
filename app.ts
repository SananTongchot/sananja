import express from "express";
import bodyParser from "body-parser";
import { router as cat } from "./api/cat";
import { router as remove } from "./api/remove";
import {router as add} from "./api/add";
import {router as upscore} from "./api/upscore";
import {router as random} from "./api/random";
import {router as uplodeimg} from "./api/uplodeimg"
import {router as admin} from "./api/admin"

export const app = express();
import cors from "cors";

// ให้ cors() ทำการกำหนดค่าและเรียก middleware
app.use(cors({
    origin: "*",
}));

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", cat);
app.use("/random", random);
app.use("/register", cat);
app.use("/remove", remove);
app.use("/addcat", add);
app.use("/upscore", upscore);
app.use("/upload",uplodeimg);
app.use("/admin", admin);
