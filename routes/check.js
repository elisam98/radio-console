var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
	var url = req.query.url
	axios.get(url).then((response) => {
		res.json({ url: url, status: response.statusText })
	})
//	res.json({ url: url });
});

module.exports = router;
