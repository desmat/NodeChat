var express = require('express');
var router = express.Router();
// var user = require('./models/user');
var chat = require('../models/chat');

var _nextUserId = 1;

router.get('/', function(req, res, next) {
	var user = req.session.user;
	console.dir(user);
	if (typeof user === 'undefined') {
		res.redirect('/login');
		return;
	}

	res.render('chat', {title: 'Node Chat: ' + user.username, messages: chat.getMessages()});
});

router.get('/login', function(req, res, next) {
  res.render('login', {username: 'User ' + _nextUserId});
});

router.post('/login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	if (typeof username === 'undefined' || !username) { res.render('login', {message: 'Username required'}); return; }
	if (typeof password === 'undefined' || !password) { res.render('login', {message: 'Password required'}); return; }

	req.session.user = {username: username};
	_nextUserId = _nextUserId + 1;

	res.redirect('/');
});

router.post('/chat', function(req, res, next) {
	var message = req.body.message;

	if (typeof message !== 'undefined' && message) {
		chat.add(message, req.session.user);
	}

	res.redirect('/');
});

module.exports = router;
