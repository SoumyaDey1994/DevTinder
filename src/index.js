const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  return res.status(200).send("Greetings from /hello route...!!");
});

app.get("/users", async (req, res) => {
  const email = req.query?.email;
  if (!email) {
    return res.status(400).send({ message: "Email Id is missing" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with email ${email} not found` });
    }
    return res.status(200).send({ result: user });
  } catch (error) {
    return res.status(500).send({
      message: "Error in fetching user with email " + email,
      error: error,
    });
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId)
    return res.status(400).send({ message: "Please attach an user id" });

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    } else {
      return res.status(200).send({ result: user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error in fetching user with id ${userId}`,
      error: error.getMessage(),
    });
  }
});

app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId)
    return res.status(400).send({ message: "Please provide an user id" });

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { returnDocument: "after" }
    );
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }
    return res
      .status(200)
      .send({ result: user, message: `User updated successfully` });
  } catch (error) {
    return res.status(500).send({
      message: `Error in updating user ${userId}`,
      error: error,
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId)
    return res.status(400).send({ message: "Please attach an user id" });

  try {
    const user = await User.findByIdAndDelete(userId, {
      returnDocument: "before",
    });
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }
    return res
      .status(200)
      .send({ result: user, message: `User deleetd successfully` });
  } catch (error) {
    return res.status(500).send({
      message: `Error in deleteing user ${userId}`,
      error: error,
    });
  }
});

app.post("/signup", async (req, res) => {
  const reqBody = req.body;
  const user = new User(reqBody);

  try {
    const result = await user.save();
    return res.status(201).send({
      ...result["_doc"],
      message: "User saved successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in saving user",
      error: error,
    });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const profiles = await User.find({});
    return res.status(200).send({
      result: profiles,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in fetching user profiles",
      error: error,
    });
  }
});

app.get("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Oops!! Something went wrong");
  }
});

app.get("/", (req, res) => {
  return res.status(200).send("Greetings from base route...");
});

APP_PORT = 7777;

connectDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is listening at port ${APP_PORT}`);
  });
});
