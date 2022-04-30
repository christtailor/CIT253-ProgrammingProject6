var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CIT301');

var studentSchema = new mongoose.Schema({

	sid: {type: Number, required: true, unique: true, min: 1000, max: 9999, },
	last_name: {type: String, required: true},
	first_name: {type: String, required: true},
	major: {type: String, required: true},
	midterm: {type: Number, min:0, max:100},
	final: {type: Number,min:0,max:100},
});

module.exports = mongoose.model('student', studentSchema);


