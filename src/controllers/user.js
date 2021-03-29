const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      isAdmin: false,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        transporter
          .sendMail({
            to: result.email,
            from: "growfree.pvt.ltd@gmail.com",
            subject: "Welcome Welcome Welcome",
            html:
              "<h1>Welcome " +
              result.username +
              "</h1> <br><p>Start exploring the journey with us.</p>",
          })
          .then((result) => {
            return res.json();
          });
      })

      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });
};
//******************************signIn controller */

exports.getUser = (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          username: fetchedUser.username,
          role: fetchedUser.role,
          userId: fetchedUser._id,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        username: fetchedUser.username,
        role: fetchedUser.role,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth Failed!",
        erorr: err,
      });
    });
};
