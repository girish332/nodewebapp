const express = require("express");
const mongodb = require("mongodb").MongoClient;
const BodyParser = require("body-parser");
const mongoose = require('mongoose');
const genre = require('./models/genre');
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
var app = express();
app.use(BodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "Saumya",
    resave: false,
    saveUninitialized: false,
}))
app.set('view-engine','ejs');



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Auth Routes


app.post("/register",(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    User.register(new User({username: username}),password,(err,user)=>{
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        })
    })
})


app.post("/login",passport.authenticate("local",{
    successMessage: "Login Successful"

},
    (req,res)=>{

})


const user = require("./models/user");



mongoose.connect("mongodb://localhost/bookstore");


app.listen(5000 , () =>{
    console.log("listening on post 5000");
})


app.get("/",(req,res) =>{
    res.render("home");
})


app.get("/secret",(req,res)=>{
    res.render("secret");
})

app.get("/api/allGenre",(req,res)=>{
    genre.find({},(err,genres) =>{

        if(err){
            console.log(err);
        }
        else{
            res.json(genres);
        }
    })
})


app.post("/api/createGenre",(req,res)=>{
    let newGenre = req.body;
    genre.create(newGenre,(err,genres)=>{

        if(err){
            res.status("400");
            res.send("Error in creation");
        }
        else{
            res.json(genres);
        }
    })
})


app.get("/api/genreById/:_id",(req,res) =>{
    genre.findById(req.params._id, (err,genres) =>{
        if(err){
            res.status(400);
            res.send("error id not corrent");
            console.log(err);


        }
        else{
            res.json(genres);
        }
    })
}

)


