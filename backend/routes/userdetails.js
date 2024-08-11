const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const UserDetail = require('../models/userdetail');
const User = require('../models/user.js');

// Route to submit user details
router.post('/userdetails', fetchUser, async (req, res) => {
    try {
        const existingDetails = await UserDetail.findOne({ user: req.user.id });

        if (existingDetails) {
            return res.status(409).json({ error: "User has already submitted their details" });
        }

        const { education, skills, pphoto, interest, links, projectMates } = req.body;

        // Validate required fields in education
        if (!education || !education.level || !education.field || !education.institution || !education.graduationYear) {
            return res.status(400).json({ error: "Missing required education fields" });
        }

        await new UserDetail({
            education,
            skills,
            pphoto,
            interest,
            user: req.user.id,
            links,
            projectMates
        }).save();

        return res.json({ message: "User details submitted successfully" });
    } catch (err) {
        console.error('Error saving user details:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});


// Route to fetch user details
router.post('/fetchuserdetails', fetchUser, async (req, res) => {
    try {
        const userDetail = await UserDetail.findOne({ user: req.user.id });

        if (!userDetail) {
            return res.status(404).json({ error: "No user details found" });
        }

        res.json(userDetail);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});
// userRoutes.js

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Find user details by user ID
      const userDetails = await UserDetail.findOne({ user: userId });
  
      if (!userDetails) {
        return res.status(404).json({ message: 'User details not found' });
      }
  
      res.json(userDetails); // Send the user details as JSON response
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user details', error: error.message });
    }
  });

  router.get('/alluserdetails', async (req, res) => {
    try {
        // Fetch all users and exclude the password field
        let users = await UserDetail.find({}); // '-password' excludes the password field
        
          // '-password' excludes the password field
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/getuser/:id', async(req, res)=>{
    const user = await User.findOne({_id: req.params.id}); 
    res.json(user)
}
)
module.exports = router;



