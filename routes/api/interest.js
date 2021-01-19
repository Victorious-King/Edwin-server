const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {name, idPeople}=req.body

    const con=connectDB()

    var sql = `INSERT INTO interest 
            (
               name, idPeople
            )
            VALUES
            (
                ?, ?
            )`;

    con.query(sql, [name, idPeople], function (err, data) {
        if (err) {
            console.log("interest creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("interest creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,name}=req.body
    console.log("req==>",req.body)

    var sql = `update  interest set name=?  where id=?`;
    const con=connectDB()
    con.query(sql, [name,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("interest creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("interest creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM interest WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete interest error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete interest Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from interest WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read interest error==>",err)
        } else {
            // successfully inserted into db
            console.log("read interest Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;