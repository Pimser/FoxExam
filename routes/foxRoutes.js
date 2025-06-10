const express = require('express');
const router = express.Router();
const foxController = require('../controllers/foxController');

// Define routes here
// router.get('/', ...);

router.get('/', foxController.getIndex);

// Voting page (shows foxes to vote on)
router.get('/vote', foxController.getVotePage);

// Handle voting (user submits a vote)
router.post('/vote', foxController.submitVote);

// Statistics page (shows top foxes)
router.get('/statistics', foxController.getStatistics);


module.exports = router;
