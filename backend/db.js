const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/academictinder";

const connectToMongo =  async ()=>{
    mongoose.connect(mongoUrl, 
        console.log('Connected Successfully')
    );
}
module.exports = connectToMongo;