const Profile = require('../models/Profile');


exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, fullName } = req.body;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    await profile.update({ username, fullName });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
