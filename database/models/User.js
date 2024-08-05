const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is mandatory'],
        unique: true,
        select: true,
    },
    EmailId: {
        type: String,
        required: [true, 'Email Id is mandatory'],
        unique: true,
        select: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory'],
        select: [true],
        
    },
    profileImg: {
        type: String,
        required: [false],
        select: true,
        default: '../../avatar.png',
    }
});

UserSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);