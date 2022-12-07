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
        required:true
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
const Nutrition=new mongoose.model("Nutrition",nutritionSchema);



module.exports={Continents,Recipe,Tags,Nutrition}; //sends data to database

const nut=new Nutrition({
  nutrition_id:3,
  calories:240,
  fat:17,
  carbs:0,
  protein:21
})

// nut.save();

const load=new Recipe({
recipe_name:'Seared Burgers With Easy-Melting Comté Cheese',
recipe_pic:'../assets/recipes/steamed-cheese-burger.webp',
recipe_description:"Some folks balk at the idea of putting American cheese anywhere near their burger. Cheese? You call that stuff cheese? More like orange chemical plasti-crap. No thanks! they say, as they peel off the orange slices and fling them against the wall all angry-like",
recipe_id:3,
tag_id:[],
continent_id:2,
preptime:15,
cooktime:15,
servings:2,
recipe_ingredients:["2 ounces coarsely grated aged Comté cheese",
"1 teaspoon instant flour (like Wondra)",
"2 teaspoons heavy cream or milk",
"1/4 teaspoon vegetable oil",
"8 ounces of freshly ground beef, formed into two 4-ounce balls",
"Kosher salt and freshly ground black pepper",
"2 toasted hamburger buns",
"Toppings and condiments as desired"],
recipe_steps:["Combine cheese, flour, and milk in a small bowl and toss with a spoon to combine. Divide mixture evenly between two small ramekins and set aside. Set a steamer insert into a large saucepot with 1 inch of water. Bring water to a simmer over medium-high heat and cover pot.","Heat vegetable oil in a 10-inch cast iron or stainless steel skillet over high heat until smoking. Add beef balls to skillet and smash firmly with a stiff spatula into 4- to 4 1/2-inch patties. Season generously with salt and pepper.","While patties cook on first side, transfer cheese cups to steamer and close lid. After the first side is well browned (about 1 1/2 minutes), carefully scrape patties up from bottom us skillet using a stiff spatula and flip. Season top side with salt and pepper. Continue to cook until second side is browned, about 1 minute longer.","Transfer patties to toasted bun bottoms. Carefully pick up a ramekin full of cheese with a pot holder and stir with a spoon until homogenous and completely smooth. Scrape cheese out of ramekin over burger. Repeat with second burger. Serve immediately with condiments and toppings as desired."],
nutrition_id:3
})

// const tag=new Tags({
// tag_id:5,
// tag_name:"Ice cream"
// })

// const tag2=new Tags({
//   tag_id:6,
//   tag_name:"Sweet"
//   })

  // const tag3=new Tags({
  //   tag_id:7,
  //   tag_name:"Deserts"
  //   })

  // load.save();
  // tag.save();
  // tag2.save();
  // tag3.save();s


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
    app.set('view engine','hbs');
    console.log(req.body.continent);
    let recipes= await Continents.aggregate([
      {
        '$match': {
          'continent_name': req.body.continent
        }
      }, {
        '$lookup': {
          'from': 'recipes', 
          'localField': 'continent_id', 
          'foreignField': 'continent_id', 
          'as': 'Recipe'
        }
      }, {
        '$addFields': {
          'recipes': {
            '$arrayElemAt': [
              '$Recipe', 0
            ]
          }
        }
      }, {
        '$addFields': {
          'recipe_name': '$recipes.recipe_name', 
          'preptime': '$recipes.preptime', 
          'cooktime': '$recipes.cooktime', 
          'recipe_pic_link': '$recipes.recipe_pic'
        }
      }, {
        '$unset': [
          'continent_id', 'continent_name', 'Recipe', 'recipes', '_id'
        ]
      }
    ]);
    console.log(recipes)
    res.render("recipes.hbs",{recipe:recipes})
})


app.post("/singlerecipe",async function(req,res){
    app.set('view engine', 'hbs') //view engine for handlebars page
    let recipes=await Recipe.aggregate( [
        {
          '$lookup': {
            'from': 'Nutrition', 
            'localField': 'nutrition_id', 
            'foreignField': 'nutrition_id', 
            'as': 'nutriton_details'
          }
        }, {
          '$addFields': {
            'calories': {
              '$arrayElemAt': [
                '$nutriton_details.calories', 0
              ]
            }, 
            'fat': {
              '$arrayElemAt': [
                '$nutriton_details.fat', 0
              ]
            }, 
            'carbs': {
              '$arrayElemAt': [
                '$nutriton_details.carbs', 0
              ]
            }, 
            'protein': {
              '$arrayElemAt': [
                '$nutriton_details.protein', 0
              ]
            }
          }
        }, {
          '$unset': [
            'nutrition_id', '_id', 'recipe_id', 'nutriton_details', '__v'
          ]
        }, {
          '$lookup': {
            'from': 'tags', 
            'localField': 'tag_id', 
            'foreignField': 'tag_id', 
            'as': 'tagResult'
          }
        }, {
          '$addFields': {
            'tags': [
              {
                '$arrayElemAt': [
                  '$tagResult.tag_name', 0
                ]
              }, {
                '$arrayElemAt': [
                  '$tagResult.tag_name', 1
                ]
              }, {
                '$arrayElemAt': [
                  '$tagResult.tag_name', 2
                ]
              }, {
                '$arrayElemAt': [
                  '$tagResult.tag_name', 3
                ]
              }
            ]
          }
        }, {
          '$unset': [
            'tag_id', 'tagResult','continent_id'
          ]
        }
      ] )
      console.log(recipes)
    res.render(path+"/single-recipe.hbs",{recipe:recipes},);
})