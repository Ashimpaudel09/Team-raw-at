const database = require("./db.js");
database();
const express = require("express");
const bodyParser = require('body-parser');

const app = express()
var cors = require('cors')

app.use(cors())
const port = 5000
app.use(bodyParser.json({ limit: '50mb' })); // Increase limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase limit as needed
app.use(express.json());
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api', require('./routes/userdetails.js'));
app.use('/api', require('./routes/course.js'));
app.use('/api', require('./routes/auth.js'));
// app.use('/api/notes', require('./routes/notes.js'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})