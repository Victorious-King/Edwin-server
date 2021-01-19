const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {name,idJob}=req.body

    const con=connectDB()

    var sql = `INSERT INTO jobprofession 
            (
               name, idJob
            )
            VALUES
            (
                ?, ?
            )`;

    con.query(sql, [name,idJob], function (err, data) {
        if (err) {
            console.log("jobprofession creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("jobprofession creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,name}=req.body
    console.log("req==>",req.body)

    var sql = `update  jobprofession set name=?  where id=?`;
    const con=connectDB()
    con.query(sql, [name,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("jobprofession creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("jobprofession creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM jobprofession WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete jobprofession error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete jobprofession Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from jobprofession WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read jobprofession error==>",err)
        } else {
            // successfully inserted into db
            console.log("read jobprofession Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;