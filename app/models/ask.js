var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AskSchema = new Schema({
	ask : String,
	user : {
		type : Schema.ObjectId,
		ref : 'User'
	}
})

var Ask = mongoose.model("Ask", AskSchema)
module.exports = Ask;