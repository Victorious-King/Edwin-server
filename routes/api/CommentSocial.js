const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {comment,date, idUser, idPeople,idPost}=req.body

    const con=connectDB()
    var date1=new Date(date)
    var sql = `INSERT INTO commentsocial 
            (
                comment, date,  idUser, idPeople, idPost
            )
            VALUES
            (
                ?, ?, ?, ?, ?
            )`;

    con.query(sql, [comment, date1,  idUser, idPeople,idPost], function (err, data) {
        if (err) {
            console.log("commentsocial creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("commentsocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,comment, date}=req.body
    console.log("req==>",req.body)
    var date1=new Date(date)
    var sql = `update  commentsocial set comment=?, date=?  where id=?`;
    const con=connectDB()
    con.query(sql, [comment ,  date1,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("commentsocial creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("commentsocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM commentsocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete commentsocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete commentsocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from commentsocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read commentsocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("read commentsocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;