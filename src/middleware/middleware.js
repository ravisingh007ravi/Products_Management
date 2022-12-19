const UserModel = require("../models/UsersModels");
const jwt= require("jsonwebtoken");

let authentication= async function(req,res,next){
    try{
        let token= req.headers["authorization"]
        let tokenArr= token.split(" ")
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        jwt.verify(tokenArr[1], "Secret-Key-lithium", function (err, decode) {
          if (err) { return res.status(401).send({ status: false, data: "Authentication failed" }) }
          req.decode = decode;
         return  next();
        })



    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}






const authorization = async function ( req, res, next) {
    try{

      let userId= req.params.userId
    //   let gettingUserId= await UserModel.findOne({_id:userId})
    //  let userId= gettingUserId.userId.toString()

    if (userId  == req.decode.userId ) return next();
      else return res.status(403).send({ status: false, msg: "you are not authorised" });

    }catch(error){
      return res.status(500).send({msg: error.message})
    }
  }


module.exports={authentication,authorization}
