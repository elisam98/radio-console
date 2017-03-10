var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var podcastSchema = new Schema({
	name: String,
	category: String,
	url: String,
	imageUrl: String,
	base64: String
});
var Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;