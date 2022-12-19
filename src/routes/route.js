const express= require("express")
const router= express.Router()
const UsersControllers= require("../controllers/UsersControllers")
const Middlewares= require("../middleware/middleware")


router.post("/register",UsersControllers.createUsers )
router.post("/login",UsersControllers.UsersLogin )
router.get("/user/:userId/profile",Middlewares.authentication,Middlewares.authorization,UsersControllers.getUsersdata)
router.put("/user/:userId/profile",Middlewares.authentication,Middlewares.authorization,UsersControllers.updatedData)

    



module.exports = router