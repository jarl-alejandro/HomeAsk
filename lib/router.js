var home = require('../app/controllers/home')
var ask = require('../app/controllers/ask')

var router = function(app, passport){

	app.get('/', home.index)
	app.get('/logout', home.log_out)
	app.get('/app', ask.app)
	app.get('/api', ask.api)

	app.get('/auth/facebook', passport.authenticate('facebook'))

	app.get('/auth/facebook/callback', passport.authenticate('facebook',
	  { successRedirect: '/app', failureRedirect: '/errorfacebook' }
	))
}

module.exports = router;

