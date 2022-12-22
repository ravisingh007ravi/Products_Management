//<----------------------< Importing : Packages >---------------------->//
const express = require('express');
const { createUser, logInUserData, getUserData, updateUserData } = require('../controller/userController.js');
const { createProduct, getProductDataWithFIlter, getProductData,deleteproduct, updateProduct } = require('../controller/productController.js');
const { createCart } =require('../controller/cartController.js')
const { authentication } = require('../middleware/auth.js');
const router = express.Router();


//<====================== < User Data > =================================>//
//<----------------------< Create User Data >---------------------------->//
router.post('/register', createUser);
//<----------------------< LogIn User Data >------------------------------>//
router.post('/login', logInUserData);
//<----------------------< Get User Data >-------------------------------->//
router.get('/user/:userId/profile', authentication, getUserData);
//<----------------------< Update User Data >----------------------------->//
router.put('/user/:userId/profile', updateUserData);

//<====================== < Product Data > ===============================>//
//<----------------------< Create Product Data >-------------------------->//
router.post('/products', createProduct);
//<----------------------< get Product Data With Filera >----------------->//
router.get('/products', getProductDataWithFIlter);
//<----------------------< get Product Data >----------------------------->//
router.get('/products/:productId', getProductData);
//<----------------------< Update Product Data >-------------------------->//
router.put('/products/:productId', updateProduct);
//<----------------------< Delete Product Data >--------------------------->//
router.delete('/products/:productId',deleteproduct);

//<====================== < Cart Data > ===================================>//
//<----------------------< Create Cart Data >------------------------------>//
router.post('/users/:userId/cart', createCart);


//<----------------------< Check All API Path >--------------------------->//
router.all('/*', (req,res) =>{
    return res.status(400).send({status:false,message:"Given path are not found !!!"})
});

//<----------------------< Exports : router >-------------------------->//
module.exports = router;
