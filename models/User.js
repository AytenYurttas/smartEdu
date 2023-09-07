const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // 'Courses' yerine 'Course' olarak düzeltildi
    }],
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
