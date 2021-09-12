let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//const mongodb_uri = process.env.MONGODB_URI || 'mongodb://localhost/resthub';

const username = 'resthub-admin';
const password = 'resthub-admin';
const database_name = 'resthub';
const mongodb_uri = process.env.MONGODB_URI ||
    `mongodb+srv://${username}:${password}@resthub-sg.udsmr.mongodb.net/${database_name}?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
};

console.log("Connecting to DB...");
mongoose.connect(mongodb_uri, options);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("DB Connected successfully");
});

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log(`Server running at http://localhost:${port}`);
});