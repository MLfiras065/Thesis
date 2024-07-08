const Owner = require('../models/Owner');

exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createOwner = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newOwner = await Owner.create({ name, email });
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    await Owner.destroy({ where: { id } });
    res.json({ message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateOwner = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    await owner.update({ name, email });
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
