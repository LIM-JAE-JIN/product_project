const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  pdTitle: {
    type: String,
    required: true,
  },
  pdContent: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  pdPassword: {
    type: Number,
    required: true,
  },
  pdDate: {
    type: Date,
    default: Date.now(),
  },
  pdState: {
    type: Boolean,
    required: true,
    default: true,
  }
})

// ID 필드를 자동으로 생성하도록 스키마 설정

module.exports = mongoose.model("Products", productsSchema);