var express = require('express');
var router = express.Router();
var Station = require('../models/station');
var Podcast = require('../models/podcast');

router.get('/', (req, res, next) => {
  res.send('SafeTelecom Radio API');
});

router.get('/stations', (req, res, next) => {
	Station.find({}, (err, stations) => {
		if (err) throw err;
		res.json(stations);
	});
});

router.post('/stations', (req, res, next) => {
	var newStation = Station(req.body); 
	newStation.save(err => {
		if (err) throw err;
		res.json(newStation);
	});
});

router.get('/stations/:id', (req, res, next) => {
	Station.findById(req.params.id, (err, station) => {
		if (err) throw err;
		res.json(station);
	});
});

router.put('/stations/:id', (req, res, next) => {
	console.log(req.body);
	Station.findByIdAndUpdate(req.params.id, req.body, (err, station) => {
		if (err) throw err;
		res.json(station);
	});
});

router.delete('/stations/:id', (req, res, next) => {
	Station.findByIdAndRemove(req.params.id, err => {
		if (err) throw err;
		res.json({status: 'success'});
		console.log('Station Deleted');
	});
});

router.get('/podcasts', (req, res, next) => {
	Podcast.find({}, (err, podcasts) => {
		if (err) throw err;
		res.json(podcasts);
	});
});

router.post('/podcasts', (req, res, next) => {
	Podcast(req.body).save(err => {
		if (err) throw err;
		res.json(req.body);
	});
});


router.get('/podcasts/:id', (req, res, next) => {
	Podcast.findById(req.params.id, (err, podcast) => {
		if (err) throw err;
		res.json(podcast);
	});
});

router.put('/podcasts/:id', (req, res, next) => {
	console.log(req.body);
	Podcast.findByIdAndUpdate(req.params.id, req.body, (err, podcast) => {
		if (err) throw err;
		res.json(podcast);
	});
});

router.delete('/podcasts/:id', (req, res, next) => {
	Podcast.findByIdAndRemove(req.params.id, err => {
		if (err) throw err;
		res.json({status: 'success'});
		console.log('Podcast Deleted');
	});
});

module.exports = router;
