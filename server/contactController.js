const Contact = require('./contactModel');

// DEFINE CONTROLLER FUNCTIONS

// Handle index actions
exports.index = function (req, res) {
  Contact.find({}, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(todo);
  });

  // Contact.get(function (err, contacts) {
  //     if (err) {
  //         res.json({
  //             status: "error",
  //             message: err,
  //         });
  //     }
  //     res.json({
  //         status: "success",
  //         message: "Contacts retrieved successfully",
  //         data: contacts
  //     });
  // });
};

// Handle create contact actions
exports.new = function (req, res) {
  console.log("Add New Contact called...");
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  console.log(req.body);
  // save the contact and check for errors
  contact.save(function (err) {
    if (err)
      res.json(err);
    res.status(200).json({
      status: "success",
      message: 'New contact created!',
      data: contact
    });
  });
};

// Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err)
      res.send(err);
    res.json({
      message: 'Contact details loading..',
      data: contact
    });
  });
};

// Handle update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err)
      res.send(err);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // save the contact and check for errors
    contact.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Contact Info updated',
        data: contact
      });
    });
  });
};

// Handle delete contact
exports.delete = function (req, res) {
  console.log('Delete contact called..')
  Contact.remove({
    _id: req.params.contact_id
  }, function (err, contact) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Contact deleted'
    });
  });
};