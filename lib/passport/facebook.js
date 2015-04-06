var User = require('../../app/models/users')
var FacebookStrategy = require('passport-facebook').Strategy
var conf = require('../../conf')

module.exports = function(passport){

	passport.use(new FacebookStrategy({
		
		clientID : conf.facebook.key,
		clientSecret : conf.facebook.secret,
		callbackURL	 : '/auth/facebook/callback',
		profileFields : ['id', 'displayName', /*'provider',*/ 'photos']

	}, function(accessToken, refresToken, profile, done){
		User.findOne({ provider_id:profile.id }, function(err, user){
			if(err)
				console.log('Hay un erro con el user de facebook ', err)

			if(!err && user != null)
				return done(null, user)

			var user = new User({
				provider_id : profile.id,
				provider : profile.provider,
				name : profile.displayName,
				photo : profile.photos[0].value
			})

			user.save(function(err){
				if(err)
					console.log("Hay un error al guardar el usuario " + err)

				done(null, user)
			})

		})
	}))
}