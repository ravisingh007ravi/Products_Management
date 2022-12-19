//<----------------------< Importing : Packages >---------------------->//
const mongoose = require('mongoose')

//<----------------------< Create : UserSchema >----------------------->//
const UserSchema = new mongoose.Schema({

    fname : {
        type : String,
        mandatory : true },

    lname : {
        type : String,
        mandatory : true},

    email : {
        type : String,
        mandatory : true,
        unique : true},

    profileImage : {
        type : String,
        mandatory : true},

    phone : {
        type : String,
        mandatory : true,
        unique : true,},

    password : {
        type : String,
        mandatory : true},

    address : {
        shipping : {
          street : {
            type : String, 
            mandatory : true},
          city: {
            type : String, 
            mandatory : true},
          pincode: {
            type : Number, 
            mandatory : true}},

        billing : {
            street : {
                type : String, 
                mandatory : true},
            city : {
                type : String, 
                mandatory : true},
            pincode : {
                type : Number,  
                mandatory : true}}}
        },

        {timestamps : true})

//<----------------------< Exports : UserModel >----------------------->//
module.exports=mongoose.model('UserModel',UserSchema)