
const express = require ('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride =require ('method-override')
const dotnev = require('dotenv').config();

const pageRoute = require('./routes/pageRoute');
const courseRoute = require ('./routes/courseRoute');
const categoryRoute = require ('./routes/categoryRoute');
const userRoute = require ('./routes/userRoute');

const app = express();




//Connect DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('DB çalıştı');
    })
    .catch((err) => {
      console.error('DB Connection Error:', err);
    });


//template engine
app.set("view engine","ejs");

//Global variable
global.userIN = null;

//middlewares

app.use(express.static("public"));
app.use(express.json()); // JSON verilerini işlemek için
app.use(express.urlencoded({ extended: true })); // URL-encoded verileri işlemek için
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://root:uTOsV4K59W5YZkYP@cluster0.1maa9qv.mongodb.net/?retryWrites=true&w=majority' })

}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});