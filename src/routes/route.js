const express= require("express")
const router= express.Router()
const UsersControllers= require("../controllers/UsersControllers")
// const Middlewares= require("../middleware/middleware")


router.post("/register",UsersControllers.createUsers )
// router.post("/log",UsersControllers.UsersLogin )
// router.get("/user/:userId/profile",)
    



module.exports = router