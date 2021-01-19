const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {bank,account_number, comments, idPeople,is_selected}=req.body

    const con=connectDB()

    var sql = `INSERT INTO bankaccount 
            (
               bank,account_number, comments, idPeople,is_selected
            )
            VALUES
            (
                ?, ?, ?, ?, ?
            )`;

    con.query(sql, [bank,account_number, comments, idPeople,is_selected], function (err, data) {
        if (err) {
            console.log("bankaccount creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("bankaccount creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,bank,account_number, comments, is_selected}=req.body
    console.log("req==>",req.body)

    var sql = `update  bankaccount set bank=?, account_number=?, comments=?, is_selected=?  where id=?`;
    const con=connectDB()
    con.query(sql, [bank,account_number, comments, is_selected,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("bankaccount creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("bankaccount creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM bankaccount WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete bankaccount error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete bankaccount Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from bankaccount WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read bankaccount error==>",err)
        } else {
            // successfully inserted into db
            console.log("read bankaccount Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;