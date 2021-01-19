const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {like,date, idUser, idPeople,idPost}=req.body

    const con=connectDB()
    var date1=new Date(date)
    var sql = `INSERT INTO likesocial 
            (
                liked, date,  idUser, idPeople, idPost
            )
            VALUES
            (
                ?, ?, ?, ?, ?
            )`;

    con.query(sql, [like, date1,  idUser, idPeople,idPost], function (err, data) {
        if (err) {
            console.log("likesocial creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("likesocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,like, date}=req.body
    console.log("req==>",req.body)
    var date1=new Date(date)
    var sql = `update  likesocial set liked=?, date=?  where id=?`;
    const con=connectDB()
    con.query(sql, [like ,  date1,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("likesocial creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("likesocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM likesocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete likesocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete likesocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from likesocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read likesocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("read likesocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;