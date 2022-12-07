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

// const load=new Recipe({
//     "continent_id": 3,
//     "cooktime": 25,
//     "nutrition_id": 7,
//     "preptime": 25,
//     "recipe_description": "These crispy and peppery fried plantain chips sport a spiced seasoning that will be familiar to anyone who knows the Pollo Campero restaurant chain, since it's modeled on their fried chicken seasoning. I'd already gone down the rabbit hole of making a copycat Pollo Campero fried chicken recipe, and I'd also recently published a recipe for basic fried plantain chips, so it seemed obvious to combine the two.",
//     "recipe_id": 8,
//     "recipe_ingredients": ["2 teaspoons seasoning salt, such as Lawry's",
//                             "1 teaspoon freshly ground black pepper",
//                             "1 teaspoon white pepper",
//                           "1/2 teaspoon cumin",
//                       "1/2 teaspoon curry powder",
//                       "1/2 teaspoon paprika",
//                   "1/2 teaspoon MSG (optional)",
//                   "1/4 teaspoon cayenne",
//               "2 green plantains",
//             "Vegetable oil, for frying (about 2 cups; 475ml)",
//             "Kosher salt"],
//     "recipe_name": "Pollo Campero–Seasoned Fried Plantain Chips",
//     "recipe_pic": "../assets/recipes/Pollo-Campero.webp",
//     "recipe_steps": [
//       "In a small bowl, stir together seasoning salt, black pepper, white pepper, cumin, curry powder, paprika, MSG (if using), and cayenne.",
//       "Cut off the ends of each plantain.",
//       "Peel plantains and Cut plantains in half crosswise.",
//       "Using a mandoline slicer, slice plantains lengthwise into planks 1/8-inch thick.",
//       "Line a rimmed baking sheet with a wire rack. Fill a large, deep cast iron or stainless steel skillet halfway with oil. Set over medium-high heat until the oil reaches 350°F (175°C). Working in batches and avoiding crowing the pan, add plantain slices and fry, turning occasionally, until golden brown all over, about 4 minutes total. Using a spider strainer or slotted spoon, transfer plantains to wire rack to drain. Immediately season all over with the spice mixture followed by a sprinkling of salt. Repeat with remaining plantain slices."      
//     ],
//     "servings": 8,
//     "tag_id": []
// })

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

app.post("/home",function(req,res){
    res.sendFile(path+"/index.html");
    // global_id=null;
});

app.post("/about",function(req,res){
  res.sendFile(path+"/about.html");
  // global_id=null;
});

app.post("/contact",function(req,res){
  res.sendFile(path+"/contact.html");
  // global_id=null;
});


app.post("/recipes",async function(req,res){
    app.set('view engine','hbs');
    console.log(req.body.continent);
    let recipes= await Continents.aggregate([
      {
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
    console.log(req.body.r_name)
    let recipes=await Recipe.aggregate( [
      {
        '$match': {
          'recipe_name': req.body.r_name
        }
      },
        {
          '$lookup': {
            'from': 'nutritions', 
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
