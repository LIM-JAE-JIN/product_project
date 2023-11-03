const express = require("express");
const app = express();
const port = 3000;

// 라우터 불러오기
const productsRouter = require("./routes/products.router.js");

// 몽고디비 연결 불러오기
const connect = require("./schemas");
connect();

// 라우터에 바디파서를 쓰기 위한 미들웨어
app.use(express.json());

// product라우터 기본주소 및 라우터 불러오기
app.use("/product", [productsRouter]);

// test
app.get('/', (req, res) => {
  console.log(req.query);

  res.send("Hello World");
});

// 로컬서버 연결
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});