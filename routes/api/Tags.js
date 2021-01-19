const express = require("express");
const router = express.Router();
const {connectDB}=require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")

router.post("/create",authenicate,(req,res) => {
    let {name,idPost}=req.body

    const con=connectDB()

    var sql = `INSERT INTO tags 
            (
                name, idPost
            )
            VALUES
            (
                ?, ?
            )`;

    con.query(sql, [name,idPost], function (err, data) {
        if (err) {
            console.log("tags creation error==>", err)
            return  res.status(400).json({"error":err})
            // some error occured

        } else {
            // successfully inserted into db
            console.log("tags creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
//update PostSocial info
router.post("/update",authenicate,(req,res) => {
    let {id,name}=req.body
    console.log("req==>",req.body)

    var sql = `update  tags set name=?  where id=?`;
    const con=connectDB()
    con.query(sql, [name ,   id], function (err, data) {
        if (err) {
            // some error occured
            console.log("tags creation error==>",err)
        } else {
            // successfully inserted into db
            console.log("tags creation Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM tags WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete tags error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete tags Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
router.post("/read",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from tags WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            console.log("read tags error==>",err)
        } else {
            // successfully inserted into db
            console.log("read tags Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;