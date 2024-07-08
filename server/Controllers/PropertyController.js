const Owner = require("../database/models/Owner");
const Property = require("../database/models/property");
const UserRating = require("../database/models/UserRating"); // Import UserRating model

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
  const { Name, Price, image, description, category, Booked, ownershpImg, extra, location } = req.body;
  const { ownerid } = req.params;
  const extraString = Array.isArray(extra) ? extra.join(',') : extra;

  Property.create({ Name, Price, image, description, category, Booked,  ownershpImg, extra: extraString, location, ownerid })
    .then(newProperty => res.status(201).json(newProperty))
    .catch(error => {
      console.error('Error creating property:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

function updateProperty(req, res) {
  const { id } = req.params;
  const { Name, Price, image, description, category, Booked,  ownershpImg, extra, location } = req.body;

  const extraString = Array.isArray(extra) ? extra.join(',') : extra;

  Property.update({ Name, Price, image, description, category, Booked, ownershpImg, extra: extraString, location }, { where: { id } })
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

const getOwnerProperty = async (req, res) => {
  const userPost = await Property.findAll({ where: { ownerid: req.params.ownerid } });
  try {
    res.json(userPost);
  } catch (err) {
    console.log(err);
  }
};

async function rateProperty(req, res) {
  const { userId, propertyId } = req.params;
  const { rating } = req.body;

  try {
    const existingRating = await UserRating.findOne({
      where: { userId, propertyId }
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      await UserRating.create({
        userId,
        propertyId,
        rating
      });
    }

    const ratings = await UserRating.findAll({
      where: { propertyId }
    });

    const avgRating = ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0) / ratings.length;

    const property = await Property.findByPk(propertyId);
    property.rating = avgRating;
    await property.save();

    res.status(200).send({ message: "Rating submitted successfully", avgRating });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).send({ message: "Failed to submit rating" });
  }
}

async function getPropertyRating(req, res) {
  const { propertyId } = req.params;

  try {
    const ratings = await UserRating.findAll({
      where: { propertyId }
    });

    if (ratings.length === 0) {
      return res.status(200).send({ avgRating: null });
    }

    const avgRating = ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0) / ratings.length;
    res.status(200).send({ avgRating });
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).send({ message: "Failed to fetch rating" });
  }
}

module.exports = { getAllProperties, createProperty, updateProperty, deleteProperty, getProperty, getOwnerProperty, rateProperty, getPropertyRating };
