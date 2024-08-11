const mongoose = require('mongoose')
const {Schema} = mongoose;

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String },
    cost: {
      type: Number, default: 0
    },
    join:{
      joinedcost:{type: Number},
      wantTojoin: {type: String}
    },
    lessons: [{ 
      title: String, 
      content: { type: mongoose.Schema.Types.Mixed },
      videoUrl: String, 
      quiz: [Object] // you can define quiz schema as well
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course