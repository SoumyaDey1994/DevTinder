const express = require("express");

const app = express();

const users = [];

app.get("/users", (req, res) => {
  return res.status(200).send(users);
});

app.post("/users", (req, res) => {
  return res.status(201).send({
    id: Math.floor(Math.random() * 10000),
    message: "User created successfully",
  });
});

app.put("/users/:id", (req, res) => {
  return res.status(200).send({
    id: req.params.id,
    message: "User updated successfully",
  });
});

app.delete("/users/:id", (req, res) => {
  return res.status(200).send({
    id: req.params.id,
    message: "User deleted successfully",
  });
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

app.get("/", (err, req, res, next) => {
  if(err) {
    res.status(500).send("Oops!! Something went wrong");
  }
});

app.get("/", (req, res) => {
  return res.status(200).send("Greetings from base route...");
});

APP_PORT = 7777;
app.listen(APP_PORT, () =>
  console.log(`Server is listening at port ${APP_PORT}`)
);
