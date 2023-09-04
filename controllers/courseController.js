const Course = require('../models/Course');


exports.createCourse = async (req, res) => {
    try {
      const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID
      });
  
      req.flash("success", `${course.name} has been created successfully`);
      res.status(201).redirect('/courses');
    } catch (error) {
      req.flash("error", `Something happened!`);
      res.status(400).redirect('/courses');
    }
  };