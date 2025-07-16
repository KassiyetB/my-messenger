const User = require('../models/User');

exports.addFriend = async (req, res) => {
  const userId = req.user; // from JWT
  const { shortId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findOne({ shortId });

    if (!friend) {
      return res.status(404).json({ msg: 'No user found with that short ID.' });
    }

    if (friend._id.equals(user._id)) {
      return res.status(400).json({ msg: "You can't add yourself." });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ msg: 'Already friends.' });
    }

    // Add mutually
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.status(200).json({ msg: 'Friend added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error.' });
  }
};