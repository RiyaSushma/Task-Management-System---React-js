const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../../database/models/User');
const jwt = require('jsonwebtoken');
const jwt_secret = "ThisisJwtSecretCodeforTaskManagementSystem";

// create user controller

const createUser = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const encrypt_pwd = await bcrypt.hash(req.body.password, 9);
        const profileImg = req.body.profileImg || 'https://cdn-icons-png.flaticon.com/512/6386/6386976.png';
        await User.create({
            name: req.body.name,
            EmailId: req.body.EmailId.toLowerCase(),
            profileImg: profileImg,
            password: encrypt_pwd
        });
        console.log("done");
        res.json({ success: true });
    }
    catch(error) {
        console.log(error);
        res.json({ success: false });
    }
};

// login user controller

const loginUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { EmailId, password } = req.body;
        const email_lower = EmailId.toLowerCase();
        const user_info = await User.findOne({ EmailId: email_lower });
        console.log(user_info);
        if(!user_info) {
            return res.status(404).json({ errors: "Email Id not found" });
        }
        const encrypt_pwd = await bcrypt.hash(req.body.password, 10);
        const isMatch = await bcrypt.compare(password, encrypt_pwd);
        console.log(isMatch);
        if(isMatch) {
            console.log(res.json);
            const data = {
                user: {
                    id: user_info.id
                }
            }
            const authToken = jwt.sign(data, jwt_secret, { expiresIn: '24h' });
            return res.json({ success: true, authToken, emailId: email_lower, username: user_info.name, profileImg: user_info.profileImg, userId: user_info._id });
        } else {
            return res.status(404).json({ errors: "Password not matching" });
        }
    } catch(err) {
        console.log(err);
        return res.json({ success: false });
    }
};

module.exports = {
    createUser,
    loginUser
};