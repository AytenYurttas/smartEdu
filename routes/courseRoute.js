const express = require('express')
const courseController = require('../controllers/courseController');
const { models } = require('mongoose');
const { route } = require('./pageRoute');

const router = express.Router();

router.route('/').post (courseController.createCourse);

module.exports = route;