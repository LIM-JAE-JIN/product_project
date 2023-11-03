const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/product_project")
    .catch(err => console.log(err));
}

mongoose.connection.on("error", err => {
  console.log("mogoDB connect ERROR", err);
})

module.exports = connect;