const mongoose = require("mongoose");

const DB_USER = "namastenodeskd";
const DB_PASSWORD = "f4rUlxnLmZK4sVaL";
const DB_NAME = "DevTinder";
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@namastenodeskd.xjwy5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=NamasteNodeSkd`;


const connectDB = async () => {
    await mongoose.connect(CONNECTION_STRING)
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch((error) => console.log(`Error in connecting DB: ${error}`));
};

module.exports = connectDB;
