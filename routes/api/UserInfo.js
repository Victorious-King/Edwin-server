const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const {connectDB} = require("../../service/mySqlConnectService")
const authenicate=require("../../middleware/authorize")
// @route POST api/users/register
// @desc register user
// @access Public
router.post("/register", (req, res) => {
    const {name, last_name, document_type, document, nacionality, currency, unemployed, available, birthdate, password, email} = req.body
    console.log("req body==>", req.body)
    var idPeople;
    //create DB connection
    const con = connectDB()
    var sqlPeople = `INSERT INTO people 
            (
                cv_link, photo, corporate_email, email,corporate_phone, phone, wage_aspiration,profession
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?
            )`;
    let hashpasword;
    con.query(sqlPeople, ["", "", "", "", "", "", "", ""], function (err, data) {
        if (err) {
            return  res.status(400).json({"error":err})
            // some error occured
            console.log("People creation error==>", err)
        } else {
            // successfully inserted into db
            idPeople = data.insertId;
            console.log("People creation Successfully", idPeople)
            const rounds  = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    hashpasword = hash;
                    console.log("hashed password==>",hashpasword)
                    var sql = `INSERT INTO user
                    (
                        name, last_name, document_type, document,nacionality, currency, unemployed,available, birthdate, register_date, password,idPeople,email
                    )
                    VALUES
                    (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?
                    )`;
                    const date = new Date(Date.now())
                    console.log("register date==>", date)
                    con.query(sql, [name, last_name, document_type, document, nacionality, currency, unemployed, available, birthdate, date, hashpasword, idPeople, email], function (err, data) {
                        if (err) {
                            // some error occured
                            console.log("registration  error==>", err)
                            return  res.status(400).json({"error":err})
                        } else {
                            // successfully inserted into db
                            console.log("registration creation Successfully")
                            return res.status(200).json({"data": req.body});
                        }
                    });
                });
            });

        }
    });


});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
    let {email, password} = req.body

    //create DB connection
    const con = connectDB();
    var sql="SELECT * from user where email=? "
    con.query(sql,[email],function (err,data) {
        if (err) {
            // some error occured
            console.log("login error==>", err)
        }else{
            if(!data[0]){
                console.log("login result==>", data)
                return res.status(400).json({"error":"invalid email"})
            }else{
                bcrypt.compare(password, data[0].password).then(isMatch=>{
                    if(isMatch){
                        const payload = {
                            id: data[0].id,
                            name: data[0].name,
                            last_name:data[0].last_name,
                            document_type:data[0].document_type,
                            document:data[0].document,
                            nacionality:data[0].nacionality,
                            currency:data[0].currency,
                            unemployed:data[0].unemployed,
                            available:data[0].available,
                            birthdate:data[0].birthdate,
                            register_date:data[0].register_date,
                            password:data[0].password,
                            email:data[0].email,
                            idPeople:data[0].idPeople
                        };
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token:  token
                                });
                            });
                    }else{
                        return res.status(400).json({ error: "Password incorrect" });
                    }
                })


            }

        }
    })

});

// @route POST api/users/reset-password
// @desc reset password with email
// @access Public
router.post("/reset-password",authenicate,(req,res)=>{
    const {email,password,confirmpassword}=req.body
    const con=connectDB()
    if(password!=confirmpassword){
        return res.status(400).json({"error":"confirm password error"})
    }

    var sql="Select * from user where email=?"
    con.query(sql,[email],function (err,data) {
        if(err){
            console.log("register error:",err)
            return res.status(400).json({"error":err})
        }else{
            if(!data[0]){
                console.log("email not found==>", data)
                return res.status(400).json({"error":"email not found"})
            }else{
                var sql1="Update user set password=? where email=?"
                con.query(sql1,[password,email],function (err,data) {
                    if(err){
                        return res.status(400).json({"error":err})
                    }else{
                        return res.status(200).json({"success":true,"data":"password successfully updated"})
                    }

                })
            }
        }
    })
});

router.post("/read",authenicate, (req,res)=> {

    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `SELECT * from user WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("read user error==>",err)
        } else {
            // successfully inserted into db
            console.log("read user Successfully")
            return res.status(200).json({"data":data});
        }
    });
});

router.post("/delete",authenicate,(req,res) => {
    let {id}=req.body
    console.log("req==>",req.body)
    var sql = `DELETE FROM user WHERE id=?`;
    const con=connectDB()
    con.query(sql, [id], function (err, data) {
        if (err) {
            // some error occured
            return res.status(400).json({"error":err})
            console.log("delete user error==>",err)
        } else {
            // successfully inserted into db
            console.log("delete user Successfully")
            return res.status(200).json({"data":data});
        }
    });
});
module.exports = router;