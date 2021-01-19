const jwt = require('jsonwebtoken');
const config = require('../config/app');
const {connectDB}=require("../service/mySqlConnectService")
const authorize = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    console.log("authorization==>",authorization)
    if (authorization) {
        const token = authorization.replace('Bearer ', '').replace('Bearer ', '');

        try {
            console.log("token==>",token)
            const decoded = jwt.verify(token, 'secret');
            console.log("decoded==>",decoded)
            if (decoded) {

                var con=connectDB();
                var sql = `select  * from user  where id=?`;
                con.query(sql,[decoded.id],function (err,data) {
                    if(err){
                        return res.status(500).json({
                            statusCode: 500,
                            error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
                        });
                    }else{
                        if(!data[0]){
                            return res.status(500).json({
                                statusCode: 500,
                                error: [{msg: 'Account does not exist', errorCode: 'notExist'}],
                            });
                        }else{
                            req.user = data[0];
                            return next();
                        }
                    }
                })


            }
        } catch (e) {

        }
    }else{
        return res.status(401).send({error: 'Unauthorized', message: 'Authentication failed (token).'});
    }


};

module.exports = authorize;
