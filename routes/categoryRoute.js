const express = require('express');
const categoryController = require('../controllers/cateroryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory);



module.exports = router; 