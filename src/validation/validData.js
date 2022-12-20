const mongoose =require('mongoose');

//<----------------------< Check : User Validation >--------------------->//

let validname = /[a-zA-z]/;

let validemail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//let profileImage =;

let validphone = /^[0]?[6789]\d{9}$/;

let validpassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let validstreet = /[a-zA-z ]/;

let validcity = /[a-zA-z ]/;

let validpincode = /^[1-9]{1}[0-9]{5}$/;

const ValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  }


module.exports = { validname, validemail, validphone, validpassword, validstreet, validcity, validpincode, ValidObjectId }