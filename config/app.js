require('dotenv').config();

let env = process.env.NODE_ENV || 'development';
let config= {
    // App env
    env: process.env.NODE_ENV,

    // App debug mode
    debug: process.env.DEBUG ? process.env.DEBUG === 'true' : true,

    // App secret for password encoding
    appSecret: process.env.APP_SECRET || "form_wizard_secret",

    // Server port
    port: process.env.SERVER_PORT ||5000,

    // JWT secret
    jwtSecret: process.env.JWT_SECRET || "form_wizard_secret",

    // JWT expire time in seconds
    jwtExpire: parseInt(process.env.JWT_EXPIRE, 10) || 3600,

    secret_for_csrf: ''
}
module.exports = config;
