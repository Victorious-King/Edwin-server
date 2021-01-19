const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {view,date, idUser, idPeople, idPost}=req.body

    const con=connectDB()
    var date1=new Date(date)
    var sql = `INSERT INTO viewsocial 
            (
                view, date,  idUser, idPeople, idPost
            )
            VALUES
            (
                ?, ?, ?, ?, ?
            )`;

    con.query(sql, [view, date1,idUser, idPeople,idPost], function (err, data) {
        if (err) {
            console.log("viewsocial creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("viewsocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,view,date}=req.body
    console.log("req==>",req.body)
    var date1=new Date(date)
    var sql = `update  viewsocial set view=?, date=?  where id=?`;
    const con=connectDB()
    con.query(sql, [view , date1,id], function (err, data) {
        if (err) {
            // some error occured
            console.log("viewsocial creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("viewsocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM viewsocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete viewsocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete viewsocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from viewsocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read viewsocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("read viewsocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;