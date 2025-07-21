const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, //No Duplicate and must be Unique
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowsercase: true //value in lowercase
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], //only allow user or admin roles
        default: 'user'
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);