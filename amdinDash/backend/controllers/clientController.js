const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createClient = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newClient = await Client.create({ name, email });
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await Client.destroy({ where: { id } });
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    await client.update({ name, email });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
