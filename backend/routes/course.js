const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Course = require('../models/courses')
router.post('/course', fetchuser, async (req, res) => {
    // try {
        const { title, description, category, cost, lessons } = req.body;
        await new Course({ title, description, category, cost, lessons, instructor: req.user.id }).save();
        return res.json("Course submitted succesfully");
    // }
    // catch (err) {
    //     return res.json("Eroor ocurred");

    // }
})
module.exports = router;
