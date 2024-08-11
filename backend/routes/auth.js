const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const JWT_TOKEN = "thisisjwttokenusedtoidentifytheuser"
const fetchuser = require('../middleware/fetchuser');

router.post('/signup', [
    //valid data check
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter password containing at least 6 characters').isLength({ min: 6 },
    )
], async (req, res) => {
    //start of checking result of validation
    try {
        const errors = validationResult(req);
        const { name, email, password, confirmPassword } = req.body;
        if(password !== confirmPassword){
            
            return res.status(402).json({ error: "password and confirm password doesnot match" });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).json({ error: "User is already exists" });
        }
        //hashing the password for privacy using bcryptjs
        const myPlaintextPassword = password;
        const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
        //creating a user and save it in mongodb
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        //Here jwt_token is used to authenticate the user and it gives the unique value to user which helps to identify the user
        let data = {
            user: {
                id: newUser.id
            }
        }
        const userId = newUser._id
        const user_token = jwt.sign(data, JWT_TOKEN)
        return res.status(200).json({ user_token, userId });
    } catch (err) {
        return res.status(403).json({ error: err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).send("User not found");
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(500).json({ errors: [{ msg: 'Username and Password not match' }] });
        }
        let data = {
            user: {
                id: existingUser.id
            }
        }
        const userId = existingUser.id
        const academicform = existingUser.academicform;
        const user_token = jwt.sign(data, JWT_TOKEN)
        return res.status(200).json({ user_token, userId });
    } catch (err) {

        return res.status(500).json({ errors: [{ msg: 'Login Process cancelled' }] });
    }
});
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
  });

module.exports = router;
