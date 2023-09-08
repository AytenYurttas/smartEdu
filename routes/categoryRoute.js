const express = require('express');
const categoryController = require('../controllers/cateroryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);




module.exports = router; 