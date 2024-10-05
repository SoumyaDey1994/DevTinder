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

app.get("/test", (req, res) => {
  return res.status(200).send("Greetings from /test route...!!");
});

app.get("/hello", (req, res) => {
  return res.status(200).send("Greetings from /hello route...!!");
});

app.get("/", (req, res) => {
  return res.status(200).send("Greetings from base route...");
});

APP_PORT = 7777;
app.listen(APP_PORT, () =>
  console.log(`Server is listening at port ${APP_PORT}`)
);
