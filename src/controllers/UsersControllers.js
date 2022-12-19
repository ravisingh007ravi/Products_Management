
const UserModel = require("../models/UsersModels");
const aws= require("../aws/aws")
const bcrypt = require ('bcrypt');
const jwt= require("jsonwebtoken")

const createUsers = async function (req, res) {
    try{

        let uploadedFileURL ;
        let files= req.files
        if(files && files.length>0){
            
             uploadedFileURL= await aws.uploadFile( files[0] )           
        }
        else{
           return  res.status(400).send({ msg: "No file found" })
        }

      let data= req.body.data
      console.log(data)

      
   
   data= JSON.parse(data)
   console.log(data)
   

     const saltRounds = 2;
         const password = data.password;

  const salt= await bcrypt.genSalt(saltRounds)

    const encryptedPassword= await bcrypt.hash(password, salt) 



 data["password"]= encryptedPassword

 data["profileImage"]=uploadedFileURL


let data1= await UserModel.create(data)
       
        return res.status(201).send({status:true,data:data1})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }

}

//___________________login______________________________//

const UsersLogin= async function(req,res){
    try{
        let plaintextPassword= req.body.password
        let email= req.body.email
        let dataPresent= await UserModel.findOne({email:email})
       let encryptedPassword=  dataPresent.password

     let decrypt= await  bcrypt.compare(plaintextPassword, encryptedPassword)
     if(!decrypt){
        return res.status(400).send({msg:"password is not correct"})
     }
     
     
     let token = jwt.sign(
        {
            userId: dataPresent._id.toString(),
            batch: "lithium",
            project: "project5"
        },
        "Secret-Key-lithium", { expiresIn: '12h' }
    )

    return res.status(201).send({status:true,message: "User login successfull",data:{userId:dataPresent._id,token:token}})

    } 
    catch(err){
        return res.status(500).send({status:false,message:err.message})
        
    }
}



//_______________________________get:Data__________________________________//


const getUsersdata=async function(req,res){
    try{
        let userId= req.params.userId
        let data= await UserModel.findOne({_id:userId})
     
        return res.status(200).send({status:true,data:data})

    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}



// __________________________________update:Data____________________________//

const updatedData=async function(req,res){
    try{
        let userId= req.params.userId
        let data= req.body
        let updatedData= await UserModel.findOneAndUpdate({_id:userId},{$set:data},{new:true})
        return res.status(200).send({status:true,message:"updated successfully",data:updatedData})

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}




module.exports= {createUsers,UsersLogin,getUsersdata,updatedData}