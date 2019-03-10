const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

var facial_session_data = {
  /*
    this object is initialised and remains in memory till the server is running
  */
}

const API_PORT = 3001;
const app = express();
const router = express.Router();
const image_processing_router = express.Router()
// this is our MongoDB database
//const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";
const dbRoute = "mongodb://sammed:_emZEiB8-xv54C3@cluster0-shard-00-00-ill3x.mongodb.net:27017,cluster0-shard-00-01-ill3x.mongodb.net:27017,cluster0-shard-00-02-ill3x.mongodb.net:27017/icart?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  // Data.find((err, data) => {
  //   console.log(data);
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true, data: data });
  // });
  return res.json({ success: true, data: [{"_id":1,"name":"Saffola Active Edible Oil","category":"Food and Beverages","SP":105,"discount":"19%","MRP":130,"subCategory":"oils"},{"_id":2,"name":"Fortune Sunflower Refined Oil","category":"Food and Beverages","SP":560,"discount":"12%","MRP":635,"subCategory":"oils"},{"_id":3,"name":"Saffola Gold Edible Oil","category":"Food and Beverages","SP":139,"discount":"13%","MRP":159,"subCategory":"oils"},{"_id":4,"name":"Aashirvaad Atta","category":"Food and Beverages","SP":167,"discount":"5%","MRP":175,"subCategory":"Atta nd Rice"},{"_id":5,"name":"Fortune Atta","category":"Food and Beverages","SP":165,"discount":"8%","MRP":180,"subCategory":"Atta nd Rice"},{"_id":6,"name":"Kohinoor Royale Basmati Rice","category":"Food and Beverages","SP":99,"discount":"41%","MRP":169,"subCategory":"Atta nd Rice"},{"_id":7,"name":"Britania Gooday Butter","category":"Food and Beverages","SP":13,"discount":"13%","MRP":15,"subCategory":"Snacks"},{"_id":8,"name":"Ferrero Nutella Hazelnut Spread","category":"Food and Beverages","SP":749,"discount":"0%","MRP":749,"subCategory":"Snacks"},{"_id":9,"name":"Britania 50-50","category":"Food and Beverages","SP":20,"discount":"0%","MRP":20,"subCategory":"Snacks"},{"_id":10,"name":"Red Label Tea ","category":"Food and Beverages","SP":185,"discount":"0%","MRP":185,"subCategory":"Beverages"},{"_id":11,"name":"Nescafe Classic Coffee Powder","category":"Food and Beverages","SP":91,"discount":"35%","MRP":140,"subCategory":"Beverages"},{"_id":12,"name":"Real Fruit Power Litchi","category":"Food and Beverages","SP":99,"discount":"50%","MRP":198,"subCategory":"Beverages"},{"_id":13,"name":"Sunfeast Yipee Noodles","category":"Food and Beverages","SP":10,"discount":"0%","MRP":10,"subCategory":"Noodles"},{"_id":14,"name":"Nissin Food Cup Noodles","category":"Food and Beverages","SP":41,"discount":"9%","MRP":45,"subCategory":"Noodles"},{"_id":15,"name":"Sunfeast YiPPee! Mood Masala","category":"Food and Beverages","SP":15,"discount":"0%","MRP":15,"subCategory":"Noodles"},{"_id":16,"name":"Casio MJ-120DA Desktop Basic","category":"Stationary and Books","SP":403,"discount":"5%","MRP":425,"subCategory":"Calculators"},{"_id":17,"name":"Casio FX100MS Scientific Calculator","category":"Stationary and Books","SP":660,"discount":"5%","MRP":695,"subCategory":"Calculators"},{"_id":18,"name":"Cello Butter Gel Pen","category":"Stationary and Books","SP":175,"discount":"13%","MRP":200,"subCategory":"Pens"},{"_id":19,"name":"Cello Butterflow Ball Pen","category":"Stationary and Books","SP":199,"discount":"1%","MRP":200,"subCategory":"Pens"},{"_id":20,"name":"Cello Technotip Ball Pen","category":"Stationary and Books","SP":162,"discount":"19%","MRP":200,"subCategory":"Pens"},{"_id":21,"name":"Transparent Packaging","category":"Stationary and Books","SP":236,"discount":"20%","MRP":299,"subCategory":"Office Supply"},{"_id":22,"name":"Multipurpose Scissor","category":"Stationary and Books","SP":299,"discount":"70%","MRP":999,"subCategory":"Office Supply"},{"_id":23,"name":"Camlin Artist 12 Shades Oil Color","category":"Stationary and Books","SP":775,"discount":"0%","MRP":775,"subCategory":"Art Supplies"},{"_id":24,"name":"Craft Scissor","category":"Stationary and Books","SP":250,"discount":"37%","MRP":399,"subCategory":"Art Supplies"},{"_id":25,"name":"Camlin Students Oil Colour","category":"Stationary and Books","SP":570,"discount":"0%","MRP":570,"subCategory":"Art Supplies"},{"_id":26,"name":"Yonex GR 303 Badminton Racquet","category":"Sports and Fitness","SP":999,"discount":"23%","MRP":1290,"subCategory":"Sports"},{"_id":27,"name":"Sangpro I Blaken","category":"Sports and Fitness","SP":355,"discount":"64%","MRP":975,"subCategory":"Sports"},{"_id":28,"name":"Sangpro Star K_ids Football","category":"Sports and Fitness","SP":299,"discount":"70%","MRP":999,"subCategory":"Sports"},{"_id":29,"name":"Cosco Platina Football","category":"Sports and Fitness","SP":2150,"discount":"0%","MRP":2150,"subCategory":"Sports"},{"_id":30,"name":"Cosco 20 Kg Dumbbell","category":"Sports and Fitness","SP":5309,"discount":"10%","MRP":5900,"subCategory":"Fitness"},{"_id":31,"name":"Pickadda Exercise Wheel","category":"Sports and Fitness","SP":425,"discount":"67%","MRP":1299,"subCategory":"Fitness"},{"_id":32,"name":"Yonex Mavis Plastic Shuttles","category":"Sports and Fitness","SP":1770,"discount":"3%","MRP":1830,"subCategory":"Sports"},{"_id":33,"name":"Sangpro Cricket Bat","category":"Sports and Fitness","SP":355,"discount":"64%","MRP":975,"subCategory":"Sports"},{"_id":34,"name":"Sangpro Tennis Balls","category":"Sports and Fitness","SP":99,"discount":"87%","MRP":775,"subCategory":"Sports"},{"_id":35,"name":"Cosco Basketball","category":"Sports and Fitness","SP":828,"discount":"0%","MRP":828,"subCategory":"Sports"},{"_id":36,"name":"Gillette Guard Cartr_idges","category":"Beauty and Personal Care","SP":50,"discount":"0%","MRP":50,"subCategory":"Grooming"},{"_id":37,"name":"Gillette Series Shave Gel","category":"Beauty and Personal Care","SP":64,"discount":"25%","MRP":85,"subCategory":"Grooming"},{"_id":38,"name":"Fogg Bodyspray","category":"Beauty and Personal Care","SP":400,"discount":"0%","MRP":400,"subCategory":"Fragrances"},{"_id":39,"name":"Wild Stone Hydra Body Spray","category":"Beauty and Personal Care","SP":169,"discount":"15%","MRP":199,"subCategory":"Fragrances"},{"_id":40,"name":"Navaratna Cool Hair Oil","category":"Beauty and Personal Care","SP":180,"discount":"0%","MRP":180,"subCategory":"Hair Care"},{"_id":41,"name":"Dove Shampoo","category":"Beauty and Personal Care","SP":210,"discount":"0%","MRP":210,"subCategory":"Hair Care"},{"_id":42,"name":"Himalaya Anti Hair Fall Shampoo","category":"Beauty and Personal Care","SP":128,"discount":"0%","MRP":128,"subCategory":"Hair Care"},{"_id":43,"name":"Dove Cream Beauty Bathing Bar","category":"Beauty and Personal Care","SP":172,"discount":"0%","MRP":172,"subCategory":"Bathing"},{"_id":44,"name":"Dove Pink Rosa Beauty Bathing Bar","category":"Beauty and Personal Care","SP":172,"discount":"0%","MRP":172,"subCategory":"Bathing"},{"_id":45,"name":"Pears Soft and Fresh Soap Bar","category":"Beauty and Personal Care","SP":67,"discount":"0%","MRP":67,"subCategory":"Bathing"},{"_id":46,"name":"Stayfree Sanitary Pads","category":"Beauty and Personal Care","SP":33,"discount":"3%","MRP":34,"subCategory":"Feminine Care"},{"_id":47,"name":"Carefree Panty Liners","category":"Beauty and Personal Care","SP":86,"discount":"4%","MRP":90,"subCategory":"Feminine Care"},{"_id":48,"name":"Vwash Liquid Wash","category":"Beauty and Personal Care","SP":160,"discount":"3%","MRP":165,"subCategory":"Feminine Care"},{"_id":49,"name":"Whisper Sanitary Pads","category":"Beauty and Personal Care","SP":297,"discount":"23%","MRP":387,"subCategory":"Feminine Care"},{"_id":50,"name":"Dove Glowing Ritual Body Lotion","category":"Beauty and Personal Care","SP":320,"discount":"0%","MRP":320,"subCategory":"Personal Care"},{"_id":51,"name":"Vaseline Body Lotion","category":"Beauty and Personal Care","SP":265,"discount":"0%","MRP":265,"subCategory":"Personal Care"},{"_id":52,"name":"Vaseline Lip Care","category":"Beauty and Personal Care","SP":38,"discount":"16%","MRP":45,"subCategory":"Personal Care"},{"_id":53,"name":"Allen Solly Blue Jeans","category":"Clothing and Fashion","SP":2899,"discount":"0%","MRP":2899,"subCategory":"Men Clothing"},{"_id":54,"name":"Allen Solly Casual Shirt","category":"Clothing and Fashion","SP":1173,"discount":"31%","MRP":1699,"subCategory":"Men Clothing"},{"_id":55,"name":"Allen Solly Navy Jacket","category":"Clothing and Fashion","SP":1652,"discount":"42%","MRP":2799,"subCategory":"Men Clothing"},{"_id":56,"name":"Levi's Low Rise Slim Fit","category":"Clothing and Fashion","SP":2099,"discount":"30%","MRP":2999,"subCategory":"Men Clothing"},{"_id":57,"name":"Levi's Plain Cotton Vest","category":"Clothing and Fashion","SP":418,"discount":"0%","MRP":418,"subCategory":"Men Clothing"},{"_id":58,"name":"Levi's Mens Casual Shirt","category":"Clothing and Fashion","SP":1259,"discount":"30%","MRP":1799,"subCategory":"Men Clothing"},{"_id":59,"name":"Puma Men Running Shoes","category":"Clothing and Fashion","SP":1599,"discount":"52%","MRP":3299,"subCategory":"Men Clothing"},{"_id":60,"name":"Puma Men Sandals and Floaters","category":"Clothing and Fashion","SP":1499,"discount":"25%","MRP":1999,"subCategory":"Men Clothing"},{"_id":61,"name":"BIBA Anarkali Kurta","category":"Clothing and Fashion","SP":1499,"discount":"50%","MRP":2999,"subCategory":"Women Clothing"},{"_id":62,"name":"BIBA A Lined Kurti","category":"Clothing and Fashion","SP":999,"discount":"50%","MRP":1999,"subCategory":"Women Clothing"},{"_id":63,"name":"BIBA Straight Kurta","category":"Clothing and Fashion","SP":899,"discount":"40%","MRP":1499,"subCategory":"Women Clothing"},{"_id":64,"name":"BIBA Black Cotton Pants","category":"Clothing and Fashion","SP":449,"discount":"50%","MRP":899,"subCategory":"Women Clothing"},{"_id":65,"name":"BIBA Red Viscose Palazzo","category":"Clothing and Fashion","SP":449,"discount":"50%","MRP":899,"subCategory":"Women Clothing"},{"_id":66,"name":"Monte Carlo Women Jeans","category":"Clothing and Fashion","SP":999,"discount":"50%","MRP":1999,"subCategory":"Women Clothing"},{"_id":67,"name":"Monte Carlo Women Striped Shirt","category":"Clothing and Fashion","SP":1190,"discount":"0%","MRP":1190,"subCategory":"Women Clothing"},{"_id":68,"name":"Monte Carlo Red Cardigan","category":"Clothing and Fashion","SP":1846,"discount":"20%","MRP":2330,"subCategory":"Women Clothing"},{"_id":69,"name":"Monte Carlo Women Casual Top","category":"Clothing and Fashion","SP":990,"discount":"0%","MRP":990,"subCategory":"Women Clothing"},{"_id":70,"name":"Catwalk Beige Wedges","category":"Clothing and Fashion","SP":699,"discount":"63%","MRP":1895,"subCategory":"Women Clothing"},{"_id":71,"name":"Catwalk Black Heels","category":"Clothing and Fashion","SP":799,"discount":"73%","MRP":2995,"subCategory":"Women Clothing"},{"_id":72,"name":"Allen Solly Boy T-Shirt","category":"Clothing and Fashion","SP":472,"discount":"41%","MRP":799,"subCategory":"K_ids Fashion"},{"_id":73,"name":"Allen Solly Printed Frock","category":"Clothing and Fashion","SP":392,"discount":"51%","MRP":799,"subCategory":"K_ids Fashion"},{"_id":74,"name":"Allen Solly Printed Jeans","category":"Clothing and Fashion","SP":1180,"discount":"41%","MRP":1999,"subCategory":"K_ids Fashion"},{"_id":75,"name":"Harpic Toilet Cleaner","category":"Home Care","SP":36,"discount":"0%","MRP":36,"subCategory":"Home Care"},{"_id":76,"name":"Harpic Flushmatic","category":"Home Care","SP":120,"discount":"0%","MRP":120,"subCategory":"Home Care"},{"_id":77,"name":"Harpic Bathroom Cleaning Liqu_id","category":"Home Care","SP":81,"discount":"4%","MRP":84,"subCategory":"Home Care"},{"_id":78,"name":"Dettol Kitchen Dish Splash","category":"Home Care","SP":131,"discount":"0%","MRP":131,"subCategory":"Home Care"},{"_id":79,"name":"Dettol Disinfectant Hygiene Liqu_id","category":"Home Care","SP":80,"discount":"10%","MRP":89,"subCategory":"Home Care"},{"_id":80,"name":"Surf Excel Liqu_id Detergent","category":"Home Care","SP":225,"discount":"0%","MRP":225,"subCategory":"Home Care"},{"_id":81,"name":"Comfort After Wash","category":"Home Care","SP":185,"discount":"12%","MRP":210,"subCategory":"Home Care"},{"_id":82,"name":"Lizol Disinfectant","category":"Home Care","SP":172,"discount":"0%","MRP":172,"subCategory":"Home Care"},{"_id":83,"name":"Surf Excel Quick Wash Detergent","category":"Home Care","SP":340,"discount":"0%","MRP":340,"subCategory":"Home Care"}]})
});

router.post("/getPath",(req,res) => {
  console.log(req.body)
  return res.send([5,0,1,4,3])
})

router.post("/getReply",(req,res) => {
  console.log(req.body.query)
  return res.send("hello")
})


/* this is the image processing api section

*/

image_processing_router.get("/getMobileNumber", (req, res) => {
  //return mobile number
  //TODO write logic pick the phone number from frontend till here and push mobile Number
  //dummy logic
  var mobileNumber = "9456875457"
  res.json({mobileNumber : mobileNumber})
})

image_processing_router.post("/postMobileNumber", (req, res) => {
  console.log(req.body["mobileNumber"])
  //TODO write logic to do required stuff with the mobile number recieved
  res.end("success")
})

image_processing_router.post("/updateAgeAndGender", (req, res) => {
  var mobileNumber = req.body.mobileNumber;
  var age = req.body.age  ;
  var gender = req.body.gender;
  facial_session_data[mobileNumber] = {
    'age' : age,
    'gender' : gender
  }
  console.log("facial_session_data", facial_session_data)
  res.end("success")
})

// this is our update method
// this method overwrites existing data in our database
// router.post("/updateData", (req, res) => {
//   const { id, update } = req.body;
//   Data.findOneAndUpdate(id, update, err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete("/deleteData", (req, res) => {
//   const { id } = req.body;
//   Data.findOneAndDelete(id, err => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });get 
// });

// this is our create methid
// this method adds new data in our database
// router.post("/putData", (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// append /api for our http requests
app.use("/api", router);
app.use("/api/v1/image_processing", image_processing_router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));