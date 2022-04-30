var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Student = require('./modules/Student.js');

app.use(express.static('public'))       // serve static files


app.use('/showAll', function(req, res) {   // Retrieve all
                                             
    Student.find( function(err, students) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 res.send(students);  
		 }
    });
})


app.post('/addStudent', function(req, res){    
	var newStudent = new Student ({               
		sid: req.body.sid,     
       last_name: req.body.last_name,
        first_name: req.body.first_name,
        major: req.body.major,
        midterm: 0,        // new student has no scores yet
        final: 0
		
	});

	newStudent.save( function(err) { 
		if (err) {
		    res.status(500).send(err);
		}
		else {
		    res.send("Student successfully added.");  
		}
   }); 
});



app.post('/getRecord', function(req, res) {   

    var update_sid = req.body.sid;    // get posted properties


    
    Student.findOne( {sid: update_sid}, function(err, student) {  
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

app.post('/edit_data', function(req, res) { 

    var student_id = req.body.sid;    // get posted properties
    var updateMajor = req.body.major;
	var updateMidterm = req.body.midterm;
	var updateFinal = req.body.final;
    
    Student.findOne( {sid: student_id}, function(err, students) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!students) {
		    res.send('No Student with a sid of ' + update_cid);
		}
		else {
			students.major = updateMajor;
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





app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
