const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  return res.end("Greetings from /test route...!!");
});

app.get("/hello", (req, res) => {
  return res.end("Greetings from /hello route...!!");
});

app.use("/", (req, res) => {
  return res.end("Greetings from base route...");
});

APP_PORT = 7777;
app.listen(APP_PORT, () =>
  console.log(`Server is listening at port ${APP_PORT}`)
);
