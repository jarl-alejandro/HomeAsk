var cookieParser = require('cookie-parser')
var conf         = require('../../conf')

module.exports = cookieParser(conf.secret)