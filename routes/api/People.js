const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

//update people info
router.post("/update",authenicate,(req,res) => {
    let {id,cv_link,photo,corporate_email,email,corporate_phone,phone,wage_aspiration,profession}=req.body
    console.log("req==>",req.body)
    var sql = `UPDATE  people SET cv_link=?, photo=?, corporate_email=?, email=?, corporate_phone=?, phone=?, wage_aspiration=?, profession=? WHERE id=?`;
    const con=connectDB()
    con.query(sql, [cv_link , photo, corporate_email, email, corporate_phone , phone,wage_aspiration,profession,id], function (err, data) {
        if (err) {
            // some error occured
            console.log("People creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("People creation Successfully")
            return res.status(200).json({"data":req.body});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM people WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete people error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete People Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from people WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read people error==>",err)
        } else {
            // successfully inserted into db
            console.log("read People Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;