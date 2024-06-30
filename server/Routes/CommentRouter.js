const express = require('express');
const router = express.Router();
const { getComments, addComment, updateComment, removeComment } = require('../Controllers/comments');

router.get('/getAll/:propertyId', getComments);
router.post('/post/:userId/:idProperty', addComment);
router.put('/update/:id', updateComment);
router.delete('/delete/:id', removeComment);

module.exports = router;
