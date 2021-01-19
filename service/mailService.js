const {config} = require('../config/app');
const nodemailer = require('nodemailer');
const winston = require('winston');
const fs = require('fs');
const hbs = require('nodemailer-express-handlebars')

// Sends Email
module.exports.sendEmail = function (req, res) {
    return new Promise((resolve, reject) => {
        let {email} = req.body;
        let transporter = nodemailer.createTransport({
            host: config.mailHost,
            port: config.mailPort,
            secure: false,
            tls: {
                rejectUnauthorized: false
            },
            auth:
                {
                    user: config.mailUsername,
                    pass: config.mailPassword
                }
        });
        var mailOptions = {
            from: config.mailHost,
            to:email,
            subject: 'Sending Email for Updating Password',
            text: 'That was easy!'
        };
        transporter.sendMail(mailOptions, (err, info) => {
            // console.log('mailData', mailData)
            if (err) {
                console.log('err', err)
                reject(err)
            } else {
                resolve(true);
            }
        });
    })
};

module.exports.sendEmailWithFile = function (filename, email) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: config.mailHost,
            port: config.mailPort,
            secure: false,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: config.mailUsername,
                pass: config.mailPassword
            },
        });
       
        const mailOptions = {
            to: email,
            from: config.mailUsername,
            subject: 'Report',
            text: 'Vi abbiamo inviato qui il rapporto richiesto. Si prega di controllare il file allegato.',
            attachments: [   // define custom content type for the attachment
                { filename: filename, path: './uploads/' + filename },
            ]
        };
        // transporter.use('compile', hbs({
        //     viewEngine: {
        //         extname: '.handlebars',
        //         layoutsDir: 'views',
        //         defaultLayout:  mailData.template,
        //         partialsDir: 'views/',
        //     },
        //     viewPath: './views/',
        //     // "E:/Babar/BabarNewWork/crioOn/Fe/crio_updates/views"
        // }));

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                winston.error(err.message)
                reject(err)
            }
            fs.unlink('./uploads/' + filename, (e) => {
                if (e) {
                    winston.error(e.message)
                    reject(e)
                }
                winston.info('./uploads/' + filename + ' deleted!')
            })
        });
        resolve(true);
    })
};
