const express= require("express")
const route= require("./routes/route.js")
const {default:mongoose}= require("mongoose")
mongoose.set('strictQuery', false)
const multer= require("multer")

const app= express()

app.use(express.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://aliabbasbackendcohort:AMMIabbu321@cluster67.6fp98uh.mongodb.net/group17Database?retryWrites=true&w=majority",{
    useNewUrlParser: true
})
.then(()=> console.log("mongoDB is connected"))
.catch((err=> console.log(err)))


app.use("/",route)

app.listen(process.env.PORT || 3000, function(){
    console.log("express app is running on port" +(process.env.PORT || 3000))
})