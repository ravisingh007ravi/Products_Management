//<----------------------< Importing : Packages >---------------------->//
const express = require('express');
const { createUser, logInUserData, getUserData, updateUserData } = require('../controller/userController.js');
const { authentication } = require('../middleware/auth.js');
const router = express.Router();



//<----------------------< Create User Data >-------------------------->//
router.post('/register', createUser);
//<----------------------< LogIn User Data >--------------------------->//
router.post('/login', logInUserData);
//<----------------------< Get User Data >----------------------------->//
router.get('/user/:userId/profile', authentication, getUserData);
//<----------------------< Update User Data >-------------------------->//
router.put('/user/:userId/profile', updateUserData);


//<----------------------< Exports : router >-------------------------->//
module.exports = router;