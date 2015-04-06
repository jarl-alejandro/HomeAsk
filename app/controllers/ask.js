var Ask = require('../models/ask')

exports.app = function(req, res){
	Ask.find({})
	.populate('user')
	.exec(function(err, asks){
		if(err)
			console.log("Hay un error en db " + err)
		else{
			res.render('app', { 
				user:req.user,
				asks:asks
			})
		}
	})

}


exports.api = function(req, res){
	Ask.find({})
	.populate('user')
	.exec(function(err, asks){
		if(err)
			console.log("Hay un error en db " + err)
		else{
			res.json(asks)
		}
	})
}