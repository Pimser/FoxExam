const Fox = require('../models/Fox');

exports.getIndex = (req, res) => {
  res.render('index', { title: 'Welcome' });
};

exports.getVotePage = (req, res) => {
  // Her skal jeg hente ut bildene/objektene fra API-en
  res.render('voting', { title: 'Voting', foxes: [] });
};

exports.submitVote = (req, res) => {
  // Her skal jeg håntere stemme innsendingen
  res.redirect('/statistics');
};

exports.getStatistics = (req, res) => {
  // Her skal jeg hente ut statistikken til FOX stemmene på top3 og totalen stemmer
  res.render('statistics', { title: 'Statistics', topFoxes: [] });
};
