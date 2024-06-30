const Comment = require("../database/models/comments");
const User = require("../database/models/User");
const Property = require("../database/models/property");

const addComment = async (req, res) => {
  try {
    const { userId, idProperty, content } = req.body;
    const comment = await Comment.create({ userId, idProperty, content });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const comments = await Comment.findAll({
      where: { idProperty: propertyId },
      include: [
        { model: User, as: 'user' },
        { model: Property ,as:"property"}
      ]
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { idcomment: id } });
    res.status(200).json({ message: "comment removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    await Comment.update({ content }, { where: { idcomment: id } });
    res.status(200).json({ message: "comment updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getComments, addComment, updateComment, removeComment };
