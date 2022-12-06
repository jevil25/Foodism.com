//packages
const express = require("express"); //Stringeract with html file
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
        type:Number,
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
    recipe_description:{
        type:String
    },
    recipe_id:{
        type:Number,
        unique:true,
        required:true
    },
    tag_id:{
        type:Array
    },
    continent_id:{
        type:Number,
        required:true,
        unique:true
    },
    preptime:{
        type:Number,
        required:true
    },
    cooktime:{
        type:Number,
        required:true
    },
    servings:{
        type:Number
    },
    recipe_ingredients:{
        type:Array,
        required:true
    },
    recipe_steps:{
        type:Array,
        required:true
    },
    nutrition_id:{
        type:Number
    }
})

const foodtagSchema=new mongoose.Schema({
    tag_id:{
        type:Number,
        required:true,
        unique:true
    },
    tag_name:{
        type:String,
        required:true,
        unique:true
    }
});

const nutritionSchema=new mongoose.Schema({
    nutrition_id:{
        type:Number,
        required:true,
        unique:true
    },
    calories:{
        type:Number
    },
    fat:{
        type:Number
    },
    Carbs:{
        type:Number
    },
    protein:{
        type:Number
    }
});

const Continents = new mongoose.model("Continents", foodcountrySchema);
const Recipe=new mongoose.model("Recipes",recipesSchema);
const Tags=new mongoose.model("Tags",foodtagSchema);
const nutrition=new mongoose.model("Nutrition",nutritionSchema);



module.exports={Continents,Recipe,Tags,nutrition}; //sends data to database


const app=express();
app.use(express.static(__dirname));
const path=__dirname+"/views";
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

app.post("/recipes",async function(req,res){
    console.log(req.body.continent)
    let recipe=await Recipe.findOne({recipe_id:1});
    console.log(recipe)
    // res.sendFile(path+"/recipes.html")
})
