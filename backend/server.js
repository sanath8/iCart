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
  return res.json({ success: true, data: [{"_id":1,"name":"Saffola Active Edible Oil","category":"Food and Beverages","SP":105,"discount":"19%","MRP":130,"subCategory":"oils"},{"_id":2,"name":"Fortune Sunflower Refined Oil","category":"Food and Beverages","SP":560,"discount":"12%","MRP":635,"subCategory":"oils"}]})
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