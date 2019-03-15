var express = require('express');
var router = express.Router();
var cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://icart:finalyear@icartcluster-sbbe8.gcp.mongodb.net/test?retryWrites=true&authSource=admin";
const client = new MongoClient(uri, { useNewUrlParser: true });


router.use(cors())

var products = [
{
	_id : 1,
	name : "pepsi",
	price : 35,
	discount : 10,
	location : {
		2 : [3,1],
		3 : [2,4],
		4 : [3,5],
		5 : [4,6],
		6 : [1,5]
	}
},
{
	_id : 2,
	name : "coca cola",
	price : 35,
	discount : 8,
	location : {
		1 : [2,6],
		3 : [2,4],
		4 : [3,5],
		5 : [4,6],
		6 : [1,5]
	}
}
]

var users = [
	{
		_id : 1,
		phoneNumber : "7760620783",
		name : "naman bansal",
		age : 21,
		gender : "male",
		recommendations : [
			"pepsi", "coca cola"
		]

	}
]

//code i use to remove everything from a collection 
// client.connect(err => {
// 	const collection = client.db("iCartSystem").collection("Products");
//  // perform actions on the collection object
// 	collection.remove();  
// });


/* GET home page. */
router.get('/', function(req, res, next) {
	client.connect(err => {
	  const collection = client.db("test").collection("devices");
	 // perform actions on the collection object
	  // console.log(collection);
	  collection.insertOne({name : "naman bansal"}, function(err, result){
	  	if(err) throw err;
	  	console.log("one document inserted");
	    // client.close();
	    res.render('index', { title: 'Express' });	    
	  })	  
	});
});

router.get('/fromdatabase', function(req, res, next) {
	client.connect(err => {
	  const collection = client.db("iCartSystem").collection("products");
	 // perform actions on the collection object
	  collection.find({}).toArray(function(err, result){
	  	if(err) throw err;
	  	console.log(result);
	  	// client.close();
		res.send(result)	
	  })	  
	});
});


router.get('/insertDummyData', function(req, res, next) {
	client.connect(err => {
	  const collection = client.db("iCartSystem").collection("products");
	 // perform actions on the collection object
	  collection.insert(products, function(err, result){
	  	if(err) throw err;
	  	console.log(result);
	  	// client.close();
		res.render('index', { title: result });		
	  })	  
	});
});





//user login api 
function createNewCustomer(phoneNumber) {
	client.connect(err => {
	  const collection = client.db("iCartSystem").collection("users");
	 // perform actions on the collection object
	  collection.insert({			
			phoneNumber : phoneNumber,
			name : "null",
			age : "null",
			gender : "null",
			recommendations : [
			]
		}, function(err, result){
	  	if(err) throw err;
	  	console.log(result);
	  	// client.close();
		  return result;
	  })	  
	});
}

	router.get('/getUserDetails', function(req, res, next){
		var userPhoneNumber = req.query.phoneNumber;
		client.connect(err => {	
			const collection = client.db("iCartSystem").collection("users");
		 // perform actions on the collection object
			collection.find({}).toArray(function(err, result){
				if(err) throw err;
				console.log(result);
				var userInfo;
				for(var i=0; i< result.length; i++) {
					console.log(userPhoneNumber, " ", result[i].phoneNumber);
					if(userPhoneNumber == result[i].phoneNumber){
						console.log("user found")
						userInfo = result[i];
						break;
					} 
				}
				if(userInfo){
					console.log("wjhere" , userInfo.recommendations.length)
					if(userInfo.recommendations.length != 0){
						res.send(userInfo.recommendations)
					} else{
						//calls sanath's api 
						res.send({"some data coming from sanath api": "data"})
					}
				} else{
					var response = createNewCustomer(userPhoneNumber);
					res.send(response);
				}
				// client.close();			
			})	  
		});
})

//products api 
router.get('/products', function(req, res, next) {
	console.log("the product name is" +req.query.productName)

	client.connect(err => {	
	  const collection = client.db("iCartSystem").collection("products");
	  collection.find({}).toArray(function(err, result){
	  	if(err) throw err;
			console.log(result);
			var matchingProducts = [];
			for(var i=0; i< result.length; i++){
				var product_name = (result[i].name).toLowerCase();
				var databaseProductName = (req.query.productName).toLowerCase();
				console.log("one individula"+product_name + "  " + req.query.productName);
				if(product_name.startsWith(databaseProductName)){
					matchingProducts.push(result[i]);
					console.log(result[i])
				}
			}
	  	// client.close();
	  	res.send(matchingProducts);		
	  })	  
	});
});


module.exports = router;
