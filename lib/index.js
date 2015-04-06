var env = process.env.NODE_ENV || 'production'
var express = require('express')
var swig = require('swig')
var router = require('./router')
var middelwares = require('./middelwares/manager')
var passport = require('passport')
var Passport = require('./passport/passport')
var path = require('path')
var conf = require('../conf')

var App = function(config){
	config = config || {}

	this.app = express()

	//middelwares
	for(var middelware in middelwares){
		if(middelware == 'session'){
			this.app.use(config.session)
		}
		else{
			this.app.use(middelwares[middelware])
		}
	}
	
	this.app.use(passport.initialize());
	this.app.use(passport.session());

	passportAuth = new Passport(passport)

	//Development enviroment
	if(env == 'development'){
		console.log('DEVELOPMENT')
		this.app.set('view cache', false)
		swig.setDefaults({ cache:false })
	}

	//Templates
	this.app.engine('html', swig.renderFile)
	this.app.set('view engine', 'html')
	this.app.set('views', './app/views')

	router(this.app, passport)

}

module.exports = App;