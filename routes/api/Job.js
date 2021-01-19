const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {title,content,summary,expiration_date,number_places,job_type,salary,currency, language, language_level,idUser, idPeople,idCompany}=req.body
    const con=connectDB()
    var date=new Date(expiration_date)
    var sql = `INSERT INTO jobs 
            (
                title,content,summary,expiration_date,number_places,job_type,salary,currency, language, language_level,idUser, idPeople,idCompany
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`;

    con.query(sql, [title,content,summary,date,number_places,job_type,salary,currency, language, language_level,idUser, idPeople,idCompany], function (err, data) {
        if (err) {
            console.log("jobs creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("jobs creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,title,content,summary,expiration_date,number_places,job_type,salary,currency, language, language_level}=req.body
    console.log("req==>",req.body)
    var date=new Date(expiration_date)
    var sql = `update  jobs set title=?, content=?, summary=?, expiration_date=?, number_places=?, job_type=?,salary=?, currency=?,language=?, language_level=?  where id=?`;
    const con=connectDB()
    con.query(sql, [title,content,summary,date,number_places,job_type,salary,currency, language, language_level, id], function (err, data) {
        if (err) {
            // some error occured
            console.log("jobs creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("jobs creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM jobs WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete jobs error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete jobs Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from jobs WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read jobs error==>",err)
        } else {
            // successfully inserted into db
            console.log("read jobs Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;