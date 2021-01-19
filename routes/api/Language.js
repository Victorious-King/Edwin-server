const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {name,level, idPeople}=req.body

    const con=connectDB()

    var sql = `INSERT INTO language 
            (
              name,level, idPeople
            )
            VALUES
            (
                ?, ?, ?
            )`;

    con.query(sql, [name,level, idPeople], function (err, data) {
        if (err) {
            console.log("language creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("language creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,name,level}=req.body
    console.log("req==>",req.body)

    var sql = `update  language set name=?, level=?  where id=?`;
    const con=connectDB()
    con.query(sql, [name,level,id], function (err, data) {
        if (err) {
            // some error occured
            console.log("language creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("language creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM language WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete language error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete language Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from language WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read language error==>",err)
        } else {
            // successfully inserted into db
            console.log("read language Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;