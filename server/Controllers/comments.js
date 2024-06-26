const Comment = require("../database/models/comments");


function getAllComments(req, res) {
  Comment.findAll()
    .then(comments => res.json(comments))
    .catch(error => {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}


function createComment(req, res) {
  const { content } = req.body;

  Comment.create({ content })
    .then(newComment => res.status(201).json(newComment))
    .catch(error => {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}


function updateComment(req, res) {
  const { id } = req.params;
  const { content } = req.body;

  Comment.update({ content }, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json({ message: 'Comment updated successfully' });
    })
    .catch(error => {
      console.error('Error updating comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}


function deleteComment(req, res) {
  const { id } = req.params;

  Comment.destroy({ where: { id } })
    .then(deleted => {
      if (!deleted) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

module.exports = { getAllComments, createComment, updateComment, deleteComment };
