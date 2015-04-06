exports.index = function(req, res){
	res.render('index')
}

exports.log_out = function(req, res) {
  req.logout()
  res.redirect('/')
}