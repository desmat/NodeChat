var express = require('express');
var router = express.Router();
var foobar = require('../models/foobar');

router.get('/', function(req, res, next) {
  res.render('foobar', {title: 'Foobar', bars: foobar.get()});
});

router.post('/', function(req, res, next) {
	var bar = req.body.bar;

	if (typeof bar === 'undefined') {
		throw {message: 'Missing required param "bar"', status: 422};
	}

	foobar.add(bar);

	return res.redirect('/foobar');	
});

module.exports = router;
