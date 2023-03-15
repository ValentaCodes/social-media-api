const { Thought, User } = require('../models');
module.exports = {
  // Allows us to get all thoughts in database
  async getThoughts(req, res) {
    try {
      // HACK: What IS LEAN and why does this not work without it
      const thoughtData = await Thought.find().lean();
      res.json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Gets a single thought by its id
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findById(req.params.id);
      res.status(200).json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Allows us to create a thought and add the thought ID to the users thoughts array
  async createThought(req, res) {
    try {
      const { userId } = req.body;
      const thoughtData = await Thought.create(req.body).then((thought) => {
        return User.findByIdAndUpdate(userId, {
          $push: { thoughts: thought._id },
        });
      });
      // Checks to see if there is a userId in the request so we don't have unmanaged thoughts
      !thoughtData
        ? res.json('Must enter a valid userId in your request')
        : res.status(200).json('Successfully created a new thought');
    } catch (error) {
      res.json(error);
    }
  },
  // allows us to update a thoughts text based on the parameter id
  async updateThought(req, res) {
    try {
      await Thought.findByIdAndUpdate(req.params.id, {
        thoughtText: req.body.thoughtText,
      });
      res.status(200).json({ message: 'Successfully updated thought' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // allows us to delete a thought by its param id
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findByIdAndRemove(req.params.id);
      // Checks to see if the thought is in the DB
      !thoughtData
        ? res.status(400).json({ message: "That thought doesn't exists" })
        : res.status(200).json({ message: 'Successfully deleted thought' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Reactions
  // Creates a new reaction inside a specific thought document
  async createReaction(req, res) {
    try {
      console.log('Adding reaction');
      console.log(req.body);
      Thought.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      ).then((reaction) => {
        !reaction
          ? res.status(400).json({
              message:
                'Unable to add reaction. No thought with that ID was found',
            })
          : res.status(200).json(reaction);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Removes a reaction from thoughts array
  async deleteReaction(req, res) {
    try {
      console.log('Deleting reaction');
      await Thought.findByIdAndUpdate(req.params.id, {
        $pull: { reactions: req.body },
      });
      res.status(200).json({ message: 'Successfully removed reaction' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
