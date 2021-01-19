const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {country,document, description, idCompany}=req.body

    const con=connectDB()

    var sql = `INSERT INTO companycountries 
            (
                country, document,  description, idCompany
            )
            VALUES
            (
                ?, ?, ?, ?
            )`;

    con.query(sql, [country, document,  description, idCompany], function (err, data) {
        if (err) {
            console.log("companycountries creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("companycountries creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,country, document,  description}=req.body
    console.log("req==>",req.body)

    var sql = `update  companycountries set country=?, document=?, description=?  where id=?`;
    const con=connectDB()
    con.query(sql, [country, document,  description,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("companycountries creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("companycountries creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM companycountries WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete companycountries error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete companycountries Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from companycountries WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read companycountries error==>",err)
        } else {
            // successfully inserted into db
            console.log("read companycountries Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;