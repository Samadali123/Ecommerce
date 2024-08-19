const express = require('express');
const router = express.Router();
const { addProduct, totalproducts, singleproduct, updateproduct, deleteproduct, productByCategory, updateProduct } = require('../controllers/product.controllers');
const { AdminIsLoggedIn } = require('../middlewares/auth.middleware');

// /add
router.post("/add", AdminIsLoggedIn, addProduct);

// /all
router.get("/all", AdminIsLoggedIn, totalproducts);

// /product/:id
router.get("/product/:id", AdminIsLoggedIn, singleproduct);

// /product/update/:id
router.put("/product/update/:productId", AdminIsLoggedIn, updateProduct);

// /product/delete/:id
router.delete("/product/delete/:id",AdminIsLoggedIn, deleteproduct);

///category
router.get("/category", AdminIsLoggedIn,  productByCategory);


module.exports = router