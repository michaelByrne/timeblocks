var mongoose = require('mongoose');
var StorySchema = new mongoose.Schema({
	title: String,
	tag: String,
	tease: String,
	img: String,
    url: String,
	updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Story', StorySchema);


