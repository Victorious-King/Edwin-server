const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {address ,comment, country, region,city,idPeople}=req.body

    const con=connectDB()

    var sql = `INSERT INTO address 
            (
              address ,comment, country, region,city,idPeople
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?
            )`;

    con.query(sql, [address ,comment, country, region,city,idPeople], function (err, data) {
        if (err) {
            console.log("address creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("address creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,address ,comment, country, region, city}=req.body
    console.log("req==>",req.body)

    var sql = `update  address set address=?, comment=?, country=?, region=?, city=?  where id=?`;
    const con=connectDB()
    con.query(sql, [address, comment, country, region, city,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("address creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("address creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM address WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete address error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete address Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from address WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read address error==>",err)
        } else {
            // successfully inserted into db
            console.log("read address Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;