const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

//const mongodb_uri = process.env.MONGODB_URI;
const mongodb_uri = 'mongodb://localhost/resthub';

function connect() {
    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    if (process.env.NODE_ENV == 'test') {
        console.log('test environment');
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage()
            .then(() => {
                mongoose.connect(mongodb_uri, options)
                    .then((res, err) => {
                        if (err) return reject(err);
                        resolve();
                    });
            });
    }

    return new Promise((resolve, reject) => {
        mongoose.connect(mongodb_uri, options)
            .then((res, err) => {
                if (err) return reject(err);
                resolve();
            });
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };