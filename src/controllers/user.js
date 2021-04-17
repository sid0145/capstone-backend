const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const KEYS = require("../../config/keys");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: KEYS.SEND_GRID_API_KEY,
    },
  })
);

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      date: Date.now(),
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

//*****get all users */
exports.getAllUsers = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery
    .find({ role: "user" })
    .sort("-date")
    .then((data) => {
      if (!data) {
        return res.status(500).json({
          erorr: err,
        });
      }
      fetchedUsers = data;
      return User.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        users: fetchedUsers,
        maxUsers: count,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        erorr: err,
      });
    });
};

exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(500).json({
          erorr: err,
        });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        erorr: err,
      });
    });
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(500).json({
          erorr: err,
        });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        erorr: err,
      });
    });
};

exports.getCountUsers = (req, res) => {
  User.find({ role: "user" })
    .then((data) => {
      return User.countDocuments();
    })
    .then((count) => {
      return res.status(200).json({ count: count });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
