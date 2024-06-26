const express = require('express');
const router = express.Router();
const { getAllComments, createComment, updateComment, deleteComment } = require('../Controllers/comments');

router.get('/getAll', getAllComments);

router.post('/post', createComment);

router.put('/update/:id', updateComment);

router.delete('/delete/:id', deleteComment);

module.exports = router;
