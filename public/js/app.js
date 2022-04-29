
var app = angular.module('carsApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/all_cars.html',    // route for the home page
          controller : 'allCtrl'
      })
      .when('/all_cars', {
          templateUrl : 'partials/all_cars.html',
          controller : 'allCtrl'
      })
      .when('/add_car', {
          templateUrl : 'partials/add_car.html',    // add a car to db
          controller : 'addCtrl'
      })
      .when('/edit_cars', {
          templateUrl : 'partials/edit_cars.html',    // edit a car record
          controller : 'editCtrl'
      })
      .otherwise({
          redirectTo: 'partials/all_cars.html'        // any other URL goes to home
      });
});


          /*   a controller for each page  */
app.controller('allCtrl', function($scope, $http) {
    
   $http.get("/showAll")          // get all the cars 
     .then(function (response) {
	    $scope.cars = response.data;  
     });
});


app.controller('addCtrl', function($scope, $http) {
  
   $scope.addRecord = function() {      // add a car
       rnd_id = Math.floor(Math.random() * 1000) + 100; // random 3-digit car id > 100
	   
	   var info = {
         sid : $scope.sid,       // set up data object
          first_name : $scope.firstname,
          last_name : $scope.lastname,
          major : $scope.major
	   }
	   
	   url = "/addCar"
	   
	   $http.post(url, info)                // post the object data
          .then(function (response) {
			 $scope.status = response.data;  //print status of request

            $scope.sid = "";
            $scope.firstname = "";
            $scope.lastname = "";
       });   
   };
});


app.controller('editCtrl', function($scope, $http) {  // edit miles or price of record
   
   // start with the first car object in the array of cars

   
   $scope.updateRecord = function() {
	   
	   var car = $scope.car
       console.log(car)
	   
	   var info = {
	      sid : car.sid,
	  }

      console.log(info)
	   
	   url = "/updateCar";
	   $http.post(url, info)
          .then(function (response) {
            $scope.status = response.data; 
            $scope.student = response.data
            console.log(response.data) //print status of request

      });
      
	   
   }
   
   $scope.deleteRecord = function() {
	   
	   var cid = $scope.cars[$scope.carIndex].cid
	   
	   url = "/deleteCar?cid=" + cid;   // concat for get request
	   //console.log(url)
	   $http.get(url)
          .then(function (response) {
			 //$scope.car = response.data;
			 console.log($scope.car)
			 $scope.maxIndex = $scope.cars.length-1;
			 $scope.car = $scope.cars[$scope.carIndex];
      });
	  
   };
});