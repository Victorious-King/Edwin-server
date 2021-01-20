const express = require("express");
//const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const People=require("./routes/api/People")
const users = require("./routes/api/UserInfo");
const Post=require("./routes/api/Post")
const LikeSocial=require("./routes/api/LikeSocial")
const CommentSocial=require("./routes/api/CommentSocial")
const ViewSocial=require("./routes/api/ViewSocial")
const Tag=require("./routes/api/Tags")
const Campany=require("./routes/api/Company")
const CampanyCountries=require("./routes/api/CompanyCountries")
const Employe=require("./routes/api/Employe")
const Job=require("./routes/api/Job")
const JobProfession=require("./routes/api/JobProfession")
const Interested=require("./routes/api/Interested")
const Interest=require("./routes/api/interest")
const Message=require("./routes/api/Message")
const BankAccount=require("./routes/api/BankAccount")
const ProfessionAspiration=require("./routes/api/ProfessionAspiration")
const Language=require("./routes/api/Language")
const Address=require("./routes/api/Address")
const app = express();
var cors = require('cors');

app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.set('trust proxy', true);
app.use(bodyParser.json());

// Routes
app.use('/public', express.static('public'))
app.use('/public/avatar', express.static('public/avatar'))
app.use("/api/users", users);
app.use("/api/people",People);
app.use("/api/post",Post)
app.use("/api/likesocial",LikeSocial)
app.use("/api/commentsocial",CommentSocial)
app.use("/api/viewsocial",ViewSocial)
app.use("/api/tag",Tag)
app.use("/api/company",Campany)
app.use("/api/companycountries",CampanyCountries)
app.use("/api/employe",Employe)
app.use("/api/job",Job)
app.use("/api/jobprofession",JobProfession)
app.use("/api/interested",Interested)
app.use("/api/interest",Interest)
app.use("/api/message",Message)
app.use("/api/language",Language)
app.use("/api/address",Address)
app.use("/api/bankaccount",BankAccount)
app.use("/api/professionaspiration",ProfessionAspiration)

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, "client", "build")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT ;
console.log("port==================================>",port)

app.listen(port, () => console.log(`Server up and running on port ${port}`));

