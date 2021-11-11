// contactModel.js
var mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
if (process.env.NODE_ENV == 'test') {
    module.exports = mongoose.model('test-contact', contactSchema);
} else if (process.env.NODE_ENV == 'dev') {
    module.exports = mongoose.model('dev-contact', contactSchema); 
} else { // prod
    module.exports = mongoose.model('contact', contactSchema);
}
// var Contact = module.exports = mongoose.model('contact', contactSchema);
// module.exports.get = function (callback, limit) {
//     Contact.find(callback).limit(limit);
// }