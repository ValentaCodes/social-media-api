const router = require('express').Router();

// Pulls in the functioning controllers for the routes
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// The routes for our thought controllers
router.route('/').get(getThoughts).post(createThought).put(updateThought);
router.route('/:id').get(getSingleThought).delete(deleteThought);
router.route('/:id/reactions').post(createReaction).delete(deleteReaction);
module.exports = router;
