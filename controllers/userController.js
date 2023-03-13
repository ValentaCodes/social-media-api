const { User } = require('../models');

module.exports = {
  // This allows us to find and display all users in database
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // This allows us to find and display a single users information
  async getSingleUser(req, res) {
    try {
      const userData = await User.findById(req.params.id, 'thoughts friends');
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // This allows us to create new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // This allows the function to update a users username in database
  async updateUser(req, res) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
      });
      res.status(200).json({ message: `successfully updated username` });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // This allows the function to delete a user from database
  async deleteUser(req, res) {
    try {
      // Find user by req params and remove from database
      const userData = await User.findByIdAndDelete(req.params.id);
      if(!userData) {
        res.status(400).json({message: 'No user with that ID was found'})
      }
      res.status(200).json({ message: 'successfully deleted user' });
    } catch (Error) {
      res.status(500).json(Error);
    }
  },

  // This allows the function of adding a friend to a users friend list
  async addFriend(req, res) {
    try {
      // find user based on the userId path and update friends list with whats in req body
      // validators will run to check email requirements
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!userData) {
        res.status(400).json({ message: 'No user with that id was found' });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async removeFriend(req, res) {
    try {
      await User.findByIdAndUpdate(
        {_id: req.params.userId},
        { $pull: { friends: req.params.friendId }},
        { runValidators: true, new: true }
      );
      res.status(200).json({ message: 'Successfully removed friend' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
