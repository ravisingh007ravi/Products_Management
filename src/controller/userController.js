//<----------------------< Importing : Packages >---------------------->//
const userModel = require('../models/userModel.js');
const UserModel = require('../models/userModel.js'); 

//<----------------------< Create : UserFunction >--------------------->//
const createUser = async ( req, res )=>{

    try{

        let data = req.body;
        
        if(Object.keys(data).length==0) return res.status(400).send({status:false, message:"Provide User Data"})
        
        

    }
    catch(err) {return res.send({msg:err})}

}

//<----------------------< Exports : UserFunction >----------------------->//
module.exports = { createUser }