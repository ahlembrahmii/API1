require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Users");
const app = express();
/* connecting to data base */

function connect() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected successfuly");
    })

    .catch((err) => {
      console.error(err);
    });
}

connect();

app.use(express.json());
/*connecting to server*/
app.listen(process.env.PORT, function () {
  let port = process.env.PORT;
  console.log("Server listening on port:", port);
});
/*getting all users in the database*/
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
/*adding users*/
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { name, lastName, age } = req.body;
  const newUser = new User({
    name,
    lastName,
    age,
  });
  newUser
    .save()
    .then((response) => res.send(`user added:${response}`))
    .catch((err) => console.log(err));
});
/*edit user*/
app.put("/api/users/:userId", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: req.body,
    },
    { new: true }
  )

    .then((result) => res.send(result))
    .catch((err) => console.log(err));

  // let user = await User.findByIdAndUpdate(
  //   req.params.userId,
  //   {
  //     $set: req.body,
  //   },
  //   { new: true }
  // );

  // res.send(user);
});
/*delete user*/
app.delete("/api/users/:userId", (req, res) => {
  User.findByIdAndRemove(req.params.userId, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});
