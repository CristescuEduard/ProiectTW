const express = require("express");
const router = express.Router();
const productsController=require("../controllers").products;
router.get('/getAllProductsCart/:ID', productsController.getAllProductsCart);
router.get('/getProductsByCategory/:category/:userId',productsController.getProductsByCategory);
router.get('/productExpiration/:ID',productsController.ProductExpiration);
router.get('/getAvailable/:productID', productsController.getAvailable);
router.get('/getClamedByUser/:ID',productsController.getClamedByUser);
router.put('/setFree/:productID',productsController.setFree);
router.put('/setAvailable/:productID',productsController.setAvailable);
router.put('/setClaimed/:productID/:id',productsController.setClaimed);
router.put('/eraseCart/:productID',productsController.EraseCart);
router.put('/addToCart/:productID/:CartID',productsController.addToCart)
router.post('/addProduct',productsController.addProduct);


router.delete('/deleteProductbyId/:productId', productsController.deleteProductbyId);
router.delete('/deleteProductbyUser/:id', productsController.deleteProductbyUser);

module.exports=router;