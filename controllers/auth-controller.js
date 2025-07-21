const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register Controller
const registerUser = async (req, res) => {
    try {
        //Extract User Information from Request Body
        const { username, email, password, role } = req?.body;
        
        //Check if user is already exists in our database
        const checkExisingUser = await User.findOne({$or: [{ username }, { email }]});
        if (checkExisingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already exists either with same username or same email. Please try with different username or email'
            });
        }

        //hash(encrypt) user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user and save in your database
        const newlyCreatedUser = new User({
            username, 
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newlyCreatedUser.save();
        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully!',
                data: newlyCreatedUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unable to register user! please try again.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured! Plese try again'
        });
    }
}

//Login Controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        //Find if the current user is exists in the database or not
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exist"
            });
        };

        //check if the password is correct or not
        //compare(the one coming, hashed password in the database)
        const isPasswordMatch = await bcrypt.compare(password, user?.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        //Generate Token that will store user data using JWT.
        //Store that token in cookie or in storage in FE.
        //sign(user information, private or secret key, expiry)
        const accessToken = jwt.sign(
            { userId: user?._id, username: user?.username, role: user?.role }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '15m' }
        ); //encryptedForm
        res.status(200).json({
            success: true,
            message: "Logged in Successful",
            accessToken
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured! Plese try again'
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}