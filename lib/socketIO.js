var IO = require('socket.io')
var Cookie = require('cookie')
var CookieParser = require('cookie-parser')
var conf = require('../conf')
var Ask = require('../app/models/ask')

var SocketIO = function(config){

	var config = config || {}
	var session = config.session
	var io = IO.listen(config.server)

	io.use(function(socket, next){
		session(socket.request, socket.request.res, next)
	})

	io.on('connection', function(socket){
		
		socket.on("new::message", function(data){
			var ask = new Ask({
				ask:data,
				user:socket.request.session.passport.user._id
			})
			ask.save(function(err){
				if(err)
					console.log("Hay un error al guardar " + err)
				else{
					var datos= {
						data:data,
						user:socket.request.session.passport.user
					}

					io.emit("message", datos)
					//socket.broadcast.emit('message', data);
				}
			})

		})

	})
}

module.exports = SocketIO