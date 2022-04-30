CIT253 Programming Project 6 Completed
---------------------

#### Back to the Client

The assignment here is to write an app using the CIT301 database together with Angular.js to display 3 pages. As always, you should study the examples given for the last week of lecture notes to use as a guide. This assignment will not make much sense if you don't study the example code first. A link to a backup copy of the database will be given below.

This will be easier to explain if you watch this video first.

This assignment requires using Angularjs, version 1.4 or 1.5, and it requires using routing. Here are the requirements.

*   Use Angularjs and the Angularjs routing module. Also, use Bootstrap. Your pages do not need to look exactly like mine, but they need to convey the same information.
*   The index.html page should hold the header and navigation. Your partial pages should be substituted into the body of the index page using Angularjs routing. The three partial pages should be in a folder in the public folder. Pictures of this are shown below. The index.html page should be in the public folder, served as a static file like we've done earlier in the course.
*   Your code needs to work with my database, which means our Mongoose models need to be the same. An image of the model used will be shown below. We will not use any of the virtual fields used in the example shown earlier in the course.
*   You will need to have your Angularjs javascript code in a separate folder in the public folder, and and link this file to your index.html page.

When you first run your code, your index.html page should use a partial page that displays this information for all the students.

Unless you open the Mongo shell, you will not need the collection name. Here is my partial page for adding a student. Use it as you see fit.

```
<h3>Add a New Student Page</h3>  
<p>Enter the following information.</p>  
  
<p><input type='text' ng-model='sid'> Enter student ID (4 digits)</p>  
<p><input type='text' ng-model='firstname'> Enter first name </p>  
<p><input type='text' ng-model='lastname'> Enter last name </p>  
  
<p>Select Major <select ng-model='major'>  
<option value='BUS'>BUS</option>  
<option value='CIT'>CIT</option>  
<option value='EET'>EET</option>  
<option value='WEB'>WEB</option>  
</select></p>  
<p><button type="button" class="btn btn-primary" ng-click="addStudent()">Add Student</button></p>  
  
<p>{{status}}</p>
```
Here is the controller that manages the add student partial page. Use or modify it as you need. You do not need to name things like I have unless you just want to.
```
app.controller('addCtrl', function($scope, $http) {  
  
    $scope.addStudent = function() {      // add a student  
        var info = {  
            sid : $scope.sid,       // set up data object  
            first\_name : $scope.firstname,  
            last\_name : $scope.lastname,  
            major : $scope.major  
        }  
  
        url = "/addStudent"  
  
        $http.post(url, info)         // post the object data  
            .then(function (response) {  
                 $scope.status = response.data;   //print status of request  
  
           // clear textboxes  
           $scope.sid = "";  
           $scope.firstname = "";  
           $scope.lastname = "";  
        });  
    };  
});  
```
And finally, here is my _index.js_ route to use to return a single student given the sid. I made a GET request from the controller to edit a student. It returned the data for that student that then populated the info for the rest of the edit student page.
```
app.get('/getOne', function(req, res) {     // Retrieve student using sid  
    sid = req.query.sid  
    Student.findOne( {sid: sid}, function(err, student) {  
        if (err) {  
            res.status(500).send(err);  
        }  
        else {  
            res.send(student);  
        }  
    });  
})
```
And here is my index.js route to add a student. It is a POST request, but you could alter it to use a GET if you wanted. Use or modify as you see fit.  
```
app.post('/addStudent', function(req, res){  
    var newStudent = new Student ({  
        sid: req.body.sid,  
        last\_name: req.body.last\_name,  
        first\_name: req.body.first\_name,  
        major: req.body.major,  
        midterm: 0,        // new student has no scores yet  
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
```
**Data**: Remember, the database is named CIT301. If, from earlier, you already have a copy of the CIT301 database that works, then good. But since you can add students in this program, if you don't have the CIT301 database, then it would be best to make sure you get the add-student feature working early in your code development so you have something to work with. If you create your own database, please check the spelling of everything so your code will work on my database.

I would guess that, in general, 85% of the questions I receive about these program are resolved by fixing spelling errors or getting all the related variables spelled in compatible ways. There is just a lot of little stuff to keep track of.

### How to Submit This Program

When you are finished or if you have trouble, do the following.

*   make a _copy_ of the whole project folder.
*   in the copy, delete the _node-modules_ folder (it's big), _but leave the package.json file in the that folder._
*   then right-click the folder, choose 'Send to', then choose "Compressed (zipped) folder".
*   attach the zipped folder to an email and send it to me.

Let me know if you have questions.
