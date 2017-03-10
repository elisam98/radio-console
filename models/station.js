var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stationSchema = new Schema({
	name: String,
	category: String,
	url: String,
	type: String
});
var Station = mongoose.model('Station', stationSchema);

module.exports = Station;