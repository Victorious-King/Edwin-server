const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {title, idPeople}=req.body

    const con=connectDB()

    var sql = `INSERT INTO professionaspiration 
            (
               title, idPeople
            )
            VALUES
            (
                ?, ?
            )`;

    con.query(sql, [title, idPeople], function (err, data) {
        if (err) {
            console.log("professionaspiration creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("professionaspiration creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,title}=req.body
    console.log("req==>",req.body)

    var sql = `update  professionaspiration set title=?  where id=?`;
    const con=connectDB()
    con.query(sql, [title,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("professionaspiration creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("professionaspiration creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM professionaspiration WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete professionaspiration error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete professionaspiration Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from professionaspiration WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read professionaspiration error==>",err)
        } else {
            // successfully inserted into db
            console.log("read professionaspiration Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;