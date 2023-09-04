const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;