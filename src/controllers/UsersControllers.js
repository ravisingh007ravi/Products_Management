
const UserModel = require("../models/UsersModels");
const bcrypt = require ('bcrypt');
const aws= require("aws-sdk")
const jwt= require("jsonwebtoken")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    
    let s3= new aws.S3({apiVersion: '2006-03-01'}); 

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  
        Key: "abc/" + file.originalname, 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
          
        return resolve(data.Location)
    })  

   })
}


const createUsers = async function (req, res) {
    try{

        let uploadedFileURL ;
        let files= req.files
        if(files && files.length>0){
            
             uploadedFileURL= await uploadFile( files[0] )           
        }
        else{
           return  res.status(400).send({ msg: "No file found" })
        }

      let data= req.body.data
   
   data= JSON.parse(data)
     
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

// //___________________login______________________________//

// const UsersLogin= async function(req,res){
//     try{
//         let plaintextPassword= req.body.password
//         let email= req.body.email
//         let dataPresent= await UserModel.findOne({email:email})
//        let encryptedPassword=  dataPresent.password

//      let decrypt= await  bcrypt.compare(plaintextPassword, encryptedPassword)
//      if(!decrypt){
//         return res.status(400).send({msg:"password is not correct"})
//      }
     
     
//      let token = jwt.sign(
//         {
//             userId: dataPresent._id.toString(),
//             batch: "lithium",
//             project: "project5"
//         },
//         "Secret-Key-lithium", { expiresIn: '12h' }
//     )

//     return res.status(201).send({status:true,message: "User login successfull",data:{userId:dataPresent._id,token:token}})

//     } 
//     catch(err){
//         return res.status(500).send({status:false,message:err.message})
        
//     }
// }



//_______________________________get:Data__________________________________//


// const getUsersdata=async function(req,res){
//     try{
      

//     }
//     catch(error){
//         return res.status(500).send({status:false,message:error.message})
//     }
// }







module.exports= {createUsers}