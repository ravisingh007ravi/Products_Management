const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const route = require('./route/routes.js')
const app=express();
const port = process.env.PORT || 3000;
const url ="mongodb+srv://ravisingh007ravi:Ravi1234@cluster0.w9hbwbb.mongodb.net/Shoppingcart?retryWrites=true&w=majority";

app.use(express.json());

mongoose.connect(url)
.then(() => console.log("Mongoose is Connected"))
.catch((err) => console.log(err));

app.use('/',route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}`));