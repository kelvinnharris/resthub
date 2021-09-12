const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

var mongodb_uri = '';
if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'dev') {
    mongodb_uri = 'mongodb://localhost/resthub';
} else {
    mongodb_uri = process.env.MONGODB_URI;
}


function connect() {
    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    return new Promise((resolve, reject) => {
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
        } else {
            mongoose.connect(mongodb_uri, options)
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                });
        }
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };