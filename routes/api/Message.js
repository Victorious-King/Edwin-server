const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {subject,message, date, idPeople,idUser}=req.body

    const con=connectDB()
    var date1=new Date(date)
    var sql = `INSERT INTO message 
            (
              subject,message, date, idPeople,idUser
            )
            VALUES
            (
                ?, ?, ?, ?, ?
            )`;

    con.query(sql, [subject,message, date1, idPeople,idUser], function (err, data) {
        if (err) {
            console.log("message creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("message creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,subject,message, date}=req.body
    console.log("req==>",req.body)
    var date1=new Date(date)
    var sql = `update  message set subject=?, message=?, date=?  where id=?`;
    const con=connectDB()
    con.query(sql, [subject,message, date1,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("message creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("message creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM message WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete message error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete message Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from message WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read message error==>",err)
        } else {
            // successfully inserted into db
            console.log("read message Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;