const express = require('express');
const router = express.Router();
const foxController = require('../controllers/foxController');


//GET
router.get('/', foxController.getIndex);

router.get('/vote', foxController.getVotePage); //stemme siden

router.get('/statistics', foxController.getStatistics); //side med statistikk

router.get("/all-foxes", foxController.getAllFoxes); //henter alle rever

//POST
router.post('/vote', foxController.submitVote); //håntering av stemmer




module.exports = router;
