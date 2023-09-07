const bcrypt = require ('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');


exports.createUser = async (req, res) => {
  try {
      const user = await User.create(req.body);
      res.status(201).redirect('/login')
    } catch (error) {
      res.status(400).json({
        status: 'register sayfası  açılamadı',
        error,
      });
    }
  };

  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
  
      if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
          if (err) {
            throw err; // Hata oluşursa hatayı fırlat
          }
  
          if (result) {
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          } else {
            res.status(401).send("Şifre yanlış"); // Şifre yanlışsa 401 gönder
          }
        });
      } else {
        res.status(404).send("Kullanıcı bulunamadı"); // Kullanıcı bulunamazsa 404 gönder
      }
    } catch (error) {
      res.status(500).json({
        status: "Giriş yapılamadı",
        error: error.message,
      });
    }
  };

  exports.logoutUser = (req, res) => {
    req.session.destroy(()=> {
      res.redirect('/');
    })
  }
  
  exports.getDashboardPage = async(req,res)=>{
    const user =await User.findOne({_id:req.session.userID}).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({user:req.session.userID})
    res.status(200).render ('dashboard',{
        page_name: "dashboard",
        user,
        categories,
        courses
    });
};

