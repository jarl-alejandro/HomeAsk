var Facebook = require('./facebook')

var Passport = function(passport){

	passport.serializeUser(function (user, done){
		done(null, user)
	});

	passport.deserializeUser(function (obj, done){
		done(null, obj)
	})

	var facebook = new Facebook(passport)
}

module.exports = Passport