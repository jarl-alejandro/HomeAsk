var http = require('http')
var redis = require('redis')
var session = require('express-session')
var RedisStrore = require('connect-redis')(session)
var mongoose = require('mongoose')

var Express = require('./lib')
var conf = require('./conf')
var socketIO = require('./lib/socketIO')
var redisClient = redis.createClient()
var redisStore = new RedisStrore({ client:redisClient })

//session
var sessionMiddleware = session({
	store: redisStore,
	key : conf.secret,
	secret : conf.secret,
})

mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name, function(err){
	if(err)
		console.log("hay un error all conectarse a DB")
	else
		console.log("Se ha conetado conn exito a DB")
})

var express = new Express({ session:sessionMiddleware })
var server = http.createServer(express.app)

var IO = new socketIO({server:server, redisStore:redisStore, session:sessionMiddleware})

server.listen(conf.port, function(){
	console.log('server runnin in http://localhost:' + conf.port)
})