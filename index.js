const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const apiRoutes = require("./api-routes");

// What is this
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Import db.js
const db = require('./db.js');
db.connect().then(() => {
    var port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
})

var conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", () => {
  console.log("DB Connected successfully.");
});

// Routes mapping
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);

module.exports = app;