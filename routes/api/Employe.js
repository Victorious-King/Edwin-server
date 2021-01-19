const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {charge,admission_date, dismissal_date,valoration,charge_description,currently,observation,idUser, idPeople,idCompany}=req.body

    const con=connectDB()
    var date1=new Date(admission_date)
    var date2=new Date(dismissal_date)
    var sql = `INSERT INTO employe 
            (
               charge,admission_date, dismissal_date,valoration,charge_description,currently,observation,idUser, idPeople,idCompany
            )
            VALUES
            (
                ?, ?, ?, ?, ?,?, ?, ?, ?, ?
            )`;

    con.query(sql, [charge,date1, date2,valoration,charge_description,currently,observation,idUser, idPeople,idCompany], function (err, data) {
        if (err) {
            console.log("employe creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("employe creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,charge,admission_date, dismissal_date,valoration,charge_description,currently,observation}=req.body
    console.log("req==>",req.body)
    var date1=new Date(admission_date)
    var date2=new Date(dismissal_date)
    var sql = `update  employe set charge=?, admission_date=?, dismissal_date=?, valoration=?, charge_description=?, currently=?, observation=?  where id=?`;
    const con=connectDB()
    con.query(sql, [charge,date1, date2,valoration,charge_description,currently,observation,id], function (err, data) {
        if (err) {
            // some error occured
            console.log("employe creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("employe creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM employe WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete employe error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete employe Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from employe WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read employe error==>",err)
        } else {
            // successfully inserted into db
            console.log("read employe Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;