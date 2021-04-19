const Contact = require("../models/contact");

exports.postContact = (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: Date.now(),
  });

  contact
    .save()
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "error" });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.getContacts = (req, res) => {
  Contact.find()
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "error" });
      }
      return res.status(200).json({
        contacts: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};

exports.deleteContact = (req, res) => {
  Contact.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "error" });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};
