const router = require('express').Router();
const questionController = require('../Controller/QuestionController');


router.get('/', questionController.index);
router.post('/', questionController.create);
router.get('/search', questionController.search);
router.post('/update/:id', questionController.update);
router.delete('/delete/:id', questionController.delete);
module.exports = router;
