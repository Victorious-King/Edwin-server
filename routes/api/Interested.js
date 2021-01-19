const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {date,cv_link, message, idPeople,idUser,idJob}=req.body

    const con=connectDB()
    var date1=new Date(date)
    var sql = `INSERT INTO interested 
            (
                date,cv_link, message, idPeople,idUser,idJob
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?
            )`;

    con.query(sql, [date1,cv_link, message, idPeople,idUser,idJob], function (err, data) {
        if (err) {
            console.log("interested creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("interested creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,date,cv_link, message}=req.body
    console.log("req==>",req.body)
    var date1=new Date(date)
    var sql = `update  interested set date=?, cv_link=?, message=?  where id=?`;
    const con=connectDB()
    con.query(sql, [date1, cv_link, message,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("interested creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("interested creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM interested WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete interested error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete interested Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from interested WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read interested error==>",err)
        } else {
            // successfully inserted into db
            console.log("read interested Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;