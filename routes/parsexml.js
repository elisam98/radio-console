var express = require('express');
var router = express.Router();
var axios = require('axios')
var cheerio = require('cheerio')
var request = require('request')
var sharp = require('sharp')

router.get('/', function(req, res, next) {
	var url = req.query.url
	axios.get(url).then((response) => {
		let $ = cheerio.load(response.data, {xmlMode: true})
		var title = $('title').eq(0).text()
		var imgUrl = $('itunes\\:image').attr('href')
		
		request.get({url: imgUrl, encoding: 'binary', timeout: 1000}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var buffer = new Buffer(body, 'binary')
				sharp(buffer).resize(200).toBuffer((err, buffer, info) => {
					var imageType = response.headers["content-type"]
					var base64 = buffer.toString('base64')
					data = `data:${imageType};base64,${base64}`
					res.json({
						url: url,
						title: title,
						imgUrl: imgUrl,
						base64: data
					})
				})
			}
		});
	})
});

module.exports = router;
