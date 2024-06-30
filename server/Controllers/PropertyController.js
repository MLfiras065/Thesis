const Property = require("../database/models/property");

function getAllProperties(req, res) {
  Property.findAll()
    .then(properties => res.json(properties))
    .catch(error => {
      console.error('Error fetching properties:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

function getProperty(req, res) {
  const { id } = req.params;

  Property.findByPk(id)
    .then(property => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    })
    .catch(error => {
      console.error('Error retrieving property:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

function createProperty(req, res) {
  const { Name, Price, image, description, category, Booked, rating, ownershpImg, extra, location } = req.body;
  
  const extraString = Array.isArray(extra) ? extra.join(',') : extra;

  Property.create({ Name, Price, image, description, category, Booked, rating, ownershpImg, extra: extraString, location })
    .then(newProperty => res.status(201).json(newProperty))
    .catch(error => {
      console.error('Error creating property:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

function updateProperty(req, res) {
  const { id } = req.params;
  const { Name, Price, image, description, category, Booked, rating, ownershpImg, extra, location } = req.body;

  const extraString = Array.isArray(extra) ? extra.join(',') : extra;

  Property.update({ Name, Price, image, description, category, Booked, rating, ownershpImg, extra: extraString, location }, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Property updated successfully' });
    })
    .catch(error => {
      console.error('Error updating property:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

function deleteProperty(req, res) {
  const { id } = req.params;

  Property.destroy({ where: { id } })
    .then(deleted => {
      if (!deleted) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Property deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting property:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}
const getOwnerProperty=async(req,res)=>{
  const userPost=await Post.findAll({where:{ownerid:req.params.ownerid}})
  try {
      res.json(userPost)
  } catch (err) {
      console.log(err);
  }
}

module.exports = { getAllProperties, createProperty, updateProperty, deleteProperty, getProperty,getOwnerProperty };
