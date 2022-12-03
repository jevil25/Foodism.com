//packages
const express = require("express"); //interact with html file
const bodyParser=require("body-parser"); //to get data from user
const mongoose=require("mongoose"); //package to connect to db
const multer = require('multer');//package to upload and fetch images
const fs=require("fs");//package to read files given by the user
const hbs=require("express-handlebars");//used for hbs file soo as to use js componenets for displaying images

mongoose.connect("mongodb+srv://jevil2002:aaron2002@jevil257.lipykl5.mongodb.net/Foodism",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true
}).then(()=>{
    console.log("connection sucessfull");
}).catch((e)=>{
    console.log(e);
});


// db declaration
const foodcountrySchema=new mongoose.Schema({
    continent_id:{
        type:int,
        required:true,
        unique:true
    },
    continent_name:{
        type:String,
        required:true,
        unique:true
    }
});

const recipesSchema=new mongoose.Schema({
    recipe_name:{
        type:String
    },
    recipe_pic:{
        type:String
    },
    recipe_id:{
        type:int,
        unique:true,
        required:true
    },
    tag_id:{
        type:Array
    },
    continent_id:{
        type:int,
        required:true,
        unique:true
    },
    preptime:{
        type:int,
        required:true
    },
    cooktime:{
        type:int,
        required:true
    },
    recipe_ingredients:{
        type:Array,
        required:true
    },
    recipe_steps:{
        type:Array,
        required:true
    }
})

const foodtagSchema=new mongoose.Schema({
    tag_id:{
        type:int,
        required:true,
        unique:true
    },
    tag_name:{
        type:String,
        required:true,
        unique:true
    }
});

const Continents = new mongoose.model("Continents", foodcountrySchema);
const Recipe=new mongoose.model("Recipes",recipesSchema);
const Tags=new mongoose.model("Tags",foodtagSchema);

module.exports={Continents,Recipe,Tags}; //sends data to database

const app=express();
app.use(express.static(__dirname));
const path=__dirname;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.listen(3000,function(){
    console.log("server is live on 3000")
});

app.get('/',function(req,res){ //used to identify user sessions
    res.sendFile(path+"/index.html");
});

app.post("/index",function(req,res){
    res.sendFile(path+"/index.html");
    // global_id=null;
});

