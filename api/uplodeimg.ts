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
  const filename = Math.round(Math.random() * 10000) + ".png";
  const storageRef = ref(storage,"/images/"+filename);
  const metaData = {contentType : req.file!.mimetype};
  const snapshot = await uploadBytesResumable(storageRef,req.file!.buffer,metaData);
 const url = await getDownloadURL(snapshot.ref);
  res.status(200).json({filename:url});
  const img = res.status(200).json({filename:url});

});

router.post("/upimg", (req,res) => {
    let img : CatModel = req.body;
    let sql = "INSERT INTO `cat` where id = ? (`image`) VALUES (?)";
    sql = mysql.format(sql,[
        img.image,
    ]);

    conn.query(sql,(err,result) => {
        if (err) throw err;
        res
          .status(201)
          .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
  


// router.post("/", fileUpload.diskLoader.single("file"), (req, res) => {
//   res.json({ filename: "/uploads/" + fileUpload.filename });
// });// const fileUpload = new FileMiddleware();
