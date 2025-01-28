const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const User = require("./models/user");

const app = express();

const users = [];

app.use(bodyParser.json());

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const targetUser = users.find((user) => user.id.toString() === userId);
  return res.status(200).send(targetUser || {});
});

app.post("/users", (req, res) => {
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    ...req.body,
  };
  users.push(newUser);

  return res.status(201).send({
    ...newUser,
    message: "User created successfully",
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const targetUserIndex = users.findIndex(
    (user) => user.id.toString() === userId
  );
  if (targetUserIndex > -1) {
    users[targetUserIndex] = {
      id: userId,
      ...req.body,
    };
  }
  return res.status(200).send({
    ...users[targetUserIndex],
    message: "User updated successfully",
  });
});

app.delete("/users/:id", (req, res) => {
  return res.status(200).send({
    id: req.params.id,
    message: "User deleted successfully",
  });
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

app.get(
  "/test",
  (req, res, next) => {
    console.log("Route Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Route Handler 2");
    next();
    // return res.status(200).send("Return from 2nd handler");
  },
  (req, res, next) => {
    console.log("Route Handler 3");
    // next();
    // return res.status(200).send("Return from 3rd handler");
    throw new Error("Cutom error");
  }
);

app.get("/hello", (req, res) => {
  return res.status(200).send("Greetings from /hello route...!!");
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
