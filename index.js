const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const passport = require("passport");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const Keys = require("./config/Keys").mongoURL;

//routes
app.use("/", users);

//passport middleware
app.use(passport.initialize());

///passport congig
require("./config/passport")(passport);

mongoose
  .connect(Keys
    , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
