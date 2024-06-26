const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');
const Owner = require('../database/models/Owner');

const logIn = async (req, res) => {
  const { email, Password } = req.body;

  if (!email || !Password) {
    return res.status(400).json({ message: 'Please enter both email and password' });
  }

  try {
    let user = await User.findOne({ where: { email } });
    let role = 'user';

    if (!user) {
      user = await Owner.findOne({ where: { email } });
      role = 'owner';
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: role,
      },
      'RandomToken' 
    );

    res.status(200).json({ email: user.email, token: token, id: user.id, role: role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { logIn };
