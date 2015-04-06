var Facebook = require('./facebook')
//var Twitter = require('./twitter')

var Passport = function(passport){

	passport.serializeUser(function (user, done){
		done(null, user)
	});

	passport.deserializeUser(function (obj, done){
		done(null, obj)
	})

	var facebook = new Facebook(passport)
	//var twitter = new Twitter(passport)
}

module.exports = Passport