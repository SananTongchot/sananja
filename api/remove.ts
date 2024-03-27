import express from "express";
import mysql from "mysql";
export const router = express.Router();
import { conn } from "../dbconnect";
import { UserModel } from "../model";
import bodyParser = require("body-parser");

router.delete("/:id", (req, res) => {
  let id = +req.params.id;
  conn.query("DELETE FROM cat WHERE id = ?", [id], (err, result) => {
      if (err) throw err;
      res.status(200).json({ affectedRows: result.affectedRows });
  });
});
