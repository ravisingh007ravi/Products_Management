//<----------------------< Importing : Packages >---------------------->//
const express = require('express');
const { createUser } = require('../controller/userController.js');
const router = express.Router();
//<----------------------Require: Modules------------------------------>//

router.post('/register', createUser);



//<----------------------< Exports : router >-------------------------->//
module.exports = router;