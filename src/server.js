const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const KEYS = require("../config/keys");
const app = express();

//**************************route */
const userRoute = require("./routes/user");
const developerRoute = require("./routes/developer");
const projectDeveloperRoute = require("./routes/project");
const hireDeveloperRoute = require("./routes/hireDeveloper");

//***************************global configuration**********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/images", express.static(path.join("src/images")));

//************************database connection here ******************/
mongoose
  .connect(KEYS.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("and database connected!");
  })
  .catch((err) => {});

app.use("/api", userRoute);
app.use("/api", developerRoute);
app.use("/api", projectDeveloperRoute);
app.use("/api", hireDeveloperRoute);

app.listen(process.env.PORT || 9000, () => {
  console.log("server started");
});
