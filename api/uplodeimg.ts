import  express  from "express";
import path from "path";
import multer from "multer";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { CatModel, UserModel } from "../model";
import { ref,getStorage,uploadBytesResumable,getDownloadURL}from "firebase/storage";
import { initializeApp } from "firebase/app";
export const router = express.Router();

const firebaseConfig = {
    apiKey: "AIzaSyBKcHxXogeiPpk7TeZ59Iy4MkVB0USXuDU",
    authDomain: "project-cat-ce497.firebaseapp.com",
    projectId: "project-cat-ce497",
    storageBucket: "project-cat-ce497.appspot.com",
    messagingSenderId: "642854552388",
    appId: "1:642854552388:web:98fc671344caa0c15f0d11",
    measurementId: "G-1W01CEDWMM"
  };

 initializeApp(firebaseConfig); 
 
 const storage = getStorage();
class FileMiddleware{
    filename = "";

    public readonly diskLoader = multer({

        storage: multer.memoryStorage(),

        limits:{
            fileSize: 67108864,
        },
    });
}



const fileUpload = new FileMiddleware();
router.post("/img", fileUpload.diskLoader.single("file"), async (req, res) => {
  try {
      // เช็คว่าผู้ใช้มีรูปภาพอยู่กี่รูปแล้ว
      const countSql = "SELECT COUNT(*) AS num_images FROM `cat` WHERE `cid` = ?";
      const userId = req.body.userId;
      const countQuery = mysql.format(countSql, [userId]);

      conn.query(countQuery, async (countErr, countResult) => {
          if (countErr) {
              console.error('Error counting existing images:', countErr);
              return res.status(500).json({ error: 'Internal Server Error' });
          }

          const numImages = countResult[0].num_images;

          // ตรวจสอบว่าผู้ใช้มีรูปภาพไม่เกิน 5 รูปหรือไม่
          if (numImages >= 5) {
              return res.status(400).json({ error: 'Exceeded maximum number of images allowed' });
          }

          // ถ้าจำนวนรูปภาพไม่เกิน 5 รูป ให้ดำเนินการเพิ่มรูปภาพ
          const filename = Math.round(Math.random() * 10000) + ".png";
          const storageRef = ref(storage, "/images/" + filename);
          const metaData = { contentType: req.file!.mimetype, userId: userId };
          const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer, metaData);
          const url = await getDownloadURL(snapshot.ref);

          // เพิ่มข้อมูลรูปภาพลงในฐานข้อมูล
          const insertSql = "INSERT INTO `cat` (`image`, `cid`) VALUES (?, ?)";
          const insertQuery = mysql.format(insertSql, [url, userId]);

          conn.query(insertQuery, (insertErr, insertResult) => {
              if (insertErr) {
                  console.error('Error inserting image data into the database:', insertErr);
                  return res.status(500).json({ error: 'Internal Server Error' });
              }
              res.status(200).json({ filename: url, dbResult: insertResult });
          });
      });
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put("/img2", fileUpload.diskLoader.single("file"), async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const filename = Math.round(Math.random() * 10000) + ".png";
  const storageRef = ref(storage, "/images/" + filename);
  const metaData = { contentType: req.file!.mimetype, id: id };
  const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer, metaData);
  const url = await getDownloadURL(snapshot.ref);

  // เพิ่มข้อมูลรูปภาพลงในฐานข้อมูล
  const updateSql = "UPDATE `cat` SET `image` = ?, `name` = ? WHERE `id` = ?";
  const updateQuery = mysql.format(updateSql, [url, name,id]);

  conn.query(updateQuery, (updateErr, updateResult) => {
      if (updateErr) {
          console.error('Error updating image data in the database:', updateErr);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ filename: url, dbResult: updateResult });
  });
});


router.put("/imgUser", fileUpload.diskLoader.single("file"), async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const filename = Math.round(Math.random() * 10000) + ".png";
    const storageRef = ref(storage, "/images/" + filename);
    const metaData = { contentType: req.file!.mimetype, id: id };
    const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer, metaData);
    const url = await getDownloadURL(snapshot.ref);

    // เพิ่มข้อมูลรูปภาพลงในฐานข้อมูล
    const updateSql = "UPDATE `user` SET `avatar` = ?, `name` = ?, `email` = ?, `password` = ? WHERE `id` = ?";
    const updateQuery = mysql.format(updateSql, [url, name, email,password, id]); // ลบ `,` ที่เกิดความผิดพลาด

    conn.query(updateQuery, (updateErr, updateResult) => {
        if (updateErr) {
            console.error('Error updating image data in the database:', updateErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ filename: url, dbResult: updateResult });
    });
});











