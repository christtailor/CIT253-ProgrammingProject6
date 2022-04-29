var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/students');  // db name = cars4sale

var carSchema = new mongoose.Schema({

	sid: {type: Number, required: true, unique: true},
	last_name: {type: String, required: true},
	first_name: {type: String, required: true},
	major: {type: String, required: true},
	midterm: {type: Number},
	final: {type: Number},
});

module.exports = mongoose.model('bhenchoa', carSchema);


