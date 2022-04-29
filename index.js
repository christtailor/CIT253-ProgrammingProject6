/*   database: makewaves    Create, Retrieve, Update, Delete  ---  CRUD    */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Car = require('./modules/Car.js');  // our Car model

app.use(express.static('public'))       // serve static files


app.use('/showAll', function(req, res) {   // Retrieve all
                                             
    Car.find( function(err, cars) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 res.send(cars);  
		 }
    });
})


app.post('/addCar', function(req, res){    // Create a new car object
	var newCar = new Car ({               
		sid: req.body.sid,     
       last_name: req.body.last_name,
        first_name: req.body.first_name,
        major: req.body.major,
        midterm: 0,        // new student has no scores yet
        final: 0
		
	});

	newCar.save( function(err) {       // same the new car
		if (err) {
		    res.status(500).send(err);
		}
		else {
		    res.send("Car successfully added.");  
		}
   }); 
});



app.post('/updateCar', function(req, res) {   // Update miles and price

    var update_sid = req.body.sid;    // get posted properties


    
    Car.findOne( {sid: update_sid}, function(err, student) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!student) {
		    res.send('No student with a sid of ' + update_sid);
		}
		else {
			res.send(student)
			
	   }
    });        

});

app.post('/edit_data', function(req, res) {   // Update miles and price

    var student_id = req.body.sid;    // get posted properties

    console.log("Student Data"+student_id)

    var updateMajpr = req.body.major;
	var updateMidterm = req.body.midterm;
	var updateFinal = req.body.final;
    
    Car.findOne( {sid: student_id}, function(err, students) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!students) {
		    res.send('No car with a cid of ' + update_cid);
		}
		else {
			students.major = updateMajpr;
			students.midterm = updateMidterm;
			students.final = updateFinal;
		
			students.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            });
		    res.send("Update successful");
	   }
    });  

});


app.get('/deleteCar', function(req, res) {   //  Delete
	 var delete_cid = req.query.cid;       //cid is unique, 
	 ///console.log(delete_cid)
	 Car.findOneAndRemove({cid: delete_cid}, function(err, car) {  // 
		if (err) {
		    res.status(500).send(err);
		}
		else if (!car) {
		    res.send('No car with a cid of ' + delete_cid);
		}
		else {
		    res.send("Car cid: " + delete_cid + " deleted."); 
		}
    });         
});


app.get('/addMany', function(req, res) {  // add mors data if you want. you can only add this data once 
    var cars = [
{cid:12,year:2010,make:"Honda",model:"Civic",miles:89100,price:10100,dealer_id:"MH228"}, 
{cid:13,year:2005,make:"Ford",model:"Ranger",miles:209950,price:5670,dealer_id:"LS522"}, 
{cid:14,year:2001,make:"Jeep",model:"Wrangler",miles:198900,price:5100,dealer_id:"KI234"}, 
{cid:15,year:2008,make:"Ford",model:"Focus",miles:290999,price:5900,dealer_id:"MJ209"}, 
{cid:16,year:2009,make:"Chevy",model:"Aveo",miles:194800,price:7700,dealer_id:"SG302"}, 
{cid:17,year:2001,make:"Ford",model:"Ranger",miles:289930,price:4100,dealer_id:"MJ209"}, 
{cid:18,year:2009,make:"Dodge",model:"Caravan",miles:96010,price:9008,dealer_id:"KI234"}
]; 

    Car.collection.insert(cars, function (err, docs) {
        if (err){ 
            res.status(500).send(err);
        } 
		else {
		    res.send( "cars were added." ); 						  
        }
    });
});


app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
