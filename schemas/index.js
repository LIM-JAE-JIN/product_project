const mongoose = require("mongoose");

// env 환경변수 불러오기
require('dotenv').config();
const dbURL = process.env.DATABASE_URL;

const connect = () => {
  mongoose
    .connect(dbURL)
    .catch(err => console.log(err));
}

mongoose.connection.on("error", err => {
  console.log("mogoDB connect ERROR", err);
})

module.exports = connect;