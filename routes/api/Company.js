const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {name,document, web, phone,principal_email}=req.body

    const con=connectDB()

    var sql = `INSERT INTO company 
            (
                name, document,  web, phone, principal_email
            )
            VALUES
            (
                ?, ?, ?, ?, ?
            )`;

    con.query(sql, [name, document,  web, phone, phone], function (err, data) {
        if (err) {
            console.log("company creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("company creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,name,document, web, phone,principal_email}=req.body
    console.log("req==>",req.body)

    var sql = `update  company set name=?, document=?, web=?, phone=?, principal_email=?  where id=?`;
    const con=connectDB()
    con.query(sql, [name,document, web, phone,principal_email,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("company creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("company creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM company WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete company error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete company Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from company WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read company error==>",err)
        } else {
            // successfully inserted into db
            console.log("read company Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;