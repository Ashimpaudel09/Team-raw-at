const mongoose = require('mongoose');
const { Schema } = mongoose;

const userDetailSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name:{
        type: String
    },
    education: {
        type: {
            level: { type: String, required: true },  // E.g., 'Bachelor Degree'
            field: { type: String, required: true },  // E.g., 'Computer Science'
            institution: { type: String, required: true }, // E.g., 'XYZ University'
            graduationYear: { type: Number, required: true } // E.g., 2022
        },
        default: {}
    },
    pphoto: {
        type: String,
        default: ''
    },
    skills: {
        type: [String], // Changed to an array to support multiple skills
        default: []
    },
    joinedCourses: {
        type: [String], // Changed to an array for multiple courses
        default: []
    },
    completedCourses: {
        type: [String], // Changed to an array for multiple courses
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },
    links: {
        type: {
            projectLinks: [String], // Array of project links
            socialLinks: [String] // Array of social media links
        },
        default: {
            projectLinks: [],
            socialLinks: []
        }
    },
    interest: {
        type: String,
        enum: [
            'To explore education resources',
            'To connect with professionals',
            'To look for study buddy',
            'Other'
        ],
        required: true
    }
    ,
    projectMates: {
        type: [String], // Array to support multiple project mates
        default: []
    }
});

const UserDetails = mongoose.model('UserDetails', userDetailSchema);
module.exports = UserDetails;
