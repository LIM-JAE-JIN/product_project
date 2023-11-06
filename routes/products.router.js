const express = require("express");
const router = express.Router();

const Products = require("../schemas/products.shema.js");

// 상품 목록 조회
router.get("/products", async (req, res) => {
  const products = await Products.find({});
  products.sort((a, b) => b.pdDate - a.pdDate);

  console.log(products);
  res.json({ products });
});

// 상품 상세 조회
router.get("/products/detail/:_id", async (req, res) => {
  const { _id } = req.params;
  const products = await Products.find({});

  console.log(products);
  const detail = products.filter((pdt) => {
    return _id === pdt._id.toHexString();
  })

  res.json({ detail });
})

// 상품 등록
router.post("/products/create", async (req, res) => {
  const { pdTitle, pdContent, nickName, pdPassword } = req.body;

  const nickNames = await Products.find({ nickName });

  if (nickNames.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 닉네임입니다."
    })
  };

  const createPdt = await Products.create({ pdTitle, pdContent, nickName, pdPassword });

  res.json({ products: createPdt });
});

// 상품 정보 수정
router.put("/products/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const { pdTitle, pdContent, pdPassword, pdState } = req.body;

  const existPdts = await Products.find({ _id });
  const matchPw = existPdts.filter(pwChk => pdPassword === pwChk.pdPassword);

  if (matchPw.length) {
    await Products.updateOne({ _id }, {
      $set: {
        pdTitle,
        pdContent,
        pdState
      }
    })
  } else {
    return res.status(400).json({
      success: false,
      errorMessage: "상품을 수정할 권한이 존재하지 않습니다."
    })
  }

  res.status(200).json({ success: true });
})

// 상품 삭제
router.delete("/products/detail/:_id", async (req, res) => {
  const { _id } = req.params;
  const { pdPassword } = req.body;

  const existPdts = await Products.find({ _id });

  const matchPw = existPdts.filter(pwChk => pdPassword === pwChk.pdPassword);

  if (matchPw.length) {
    await Products.deleteOne({ _id });
  } else {
    return res.status(400).json({
      success: false,
      errorMessage: '비밀번호가 틀렸습니다.'
    })
  }

  res.status(200).json({ success: true });
})

module.exports = router;