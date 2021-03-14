const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//**************************route */
const userRoute = require("./routes/user");
const angularDeveloperRoute = require("./routes/angularDeveloper");

//***************************global configuration**********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/images", express.static(path.join("src/images")));

//************************database connection here ******************/
mongoose
  .connect(
    "mongodb+srv://Sid:jBWcaYOiVj9oZw9M@cluster0.xz4rb.mongodb.net/capstone-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("and database connected!");
  })
  .catch((err) => {});

app.use("/api", userRoute);
app.use("/api", angularDeveloperRoute);

app.listen(process.env.PORT || 9000, () => {
  console.log("server started");
});
