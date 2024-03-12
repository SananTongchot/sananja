import express from "express";
import mysql from "mysql";
export const router = express.Router();
import { conn } from "../dbconnect";
import { CatModel } from "../model";
import bodyParser = require("body-parser");