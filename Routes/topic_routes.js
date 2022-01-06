const router = require('express').Router();
const TopicController = require('../Controller/TopicController');

router.get('/', TopicController.index);
router.post('/', TopicController.create);
router.get('/search', TopicController.search);
router.post('/update/:id', TopicController.update);
router.delete('/delete/:id', TopicController.delete);

module.exports = router;
