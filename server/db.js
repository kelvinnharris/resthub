const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const mongodb_uri = process.env.MONGODB_URI;
// var mongodb_uri = '';
// if (process.env.NODE_ENV == 'test') {
//     mongodb_uri = process.env.MONGODB_TEST_URI;
// } else if (process.env.NODE_ENV == 'dev') {
//     mongodb_uri = process.env.MONGODB_DEV_URI;
// } else {
//     mongodb_uri = process.env.MONGODB_PROD_URI;
// }


function connect() {
    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV == 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
                .then(() => {
                    console.log('Connecting with Mockgoose (test)');
                    mongoose.connect(mongodb_uri, options)
                        .then((res, err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                });
        } else {
            console.log('Connecting with MongoDB Atlas (prod/dev)');
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