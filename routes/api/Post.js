const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {title,image_link,summary,contact,actived,prenium,expirationdate,checked, idUser, idPeople}=req.body
    console.log("req==>",title,image_link,summary,contact,actived,expirationdate,prenium,checked, idUser, idPeople)
    const con=connectDB()
    var date=new Date(expirationdate)
    var sql = `INSERT INTO postsocial 
            (
                title, image_link, summary, contact,actived, expirationdate, prenium, checked, idUser, idPeople
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`;

    con.query(sql, [title, image_link, summary, contact,   actived, date,prenium, checked, idUser, idPeople], function (err, data) {
        if (err) {
            console.log("postsocial creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("postsocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,title,image_link,summary,contact,expirationdate,actived,prenium,checked}=req.body
    console.log("req==>",req.body)
    var date=new Date(expirationdate)
    var sql = `update  postsocial set title=?, image_link=?, summary=?, contact=?, expirationdate=?, actived=?,checked=?, prenium=?  where id=?`;
    const con=connectDB()
    con.query(sql, [title ,  image_link, summary, contact , date, actived,checked, prenium,  id], function (err, data) {
        if (err) {
            // some error occured
            console.log("postsocial creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("postsocial creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM postsocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete postsocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete postsocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from postsocial WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read postsocial error==>",err)
        } else {
            // successfully inserted into db
            console.log("read postsocial Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;