$(document).on("ready", homeAsk)

var socket = io()

function homeAsk(){

	$("#send").on('click', sendAsk)
}

function sendAsk(e){
	e.preventDefault()

	var data = $("#ask").val()
	$("#ask").val("")

	socket.emit("new::message", data)
}

socket.on("message", function(data){
	var template = '<article class="b-white ask"><img class="image" src="'+data.user.photo+'" alt="'+data.user.name+'"><p class="name">'+data.user.name+'</p><p class="comment">'+data.data+'</p></article>'

	$(".aks").prepend($(template).fadeIn())
})