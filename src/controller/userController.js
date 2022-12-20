//<----------------------< Importing : Packages >---------------------->//
const userModel = require('../models/userModel.js');
const aws = require('../AWS/AWS.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {validname, validemail, validphone,validpassword, validstreet, validcity, validpincode, ValidObjectId} =require('../validation/validData.js');



//<----------------------< Create : UserFunction >--------------------->//
const createUser = async ( req, res )=>{

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
       
        data= JSON.parse(data)
        
         const { fname, lname, email, profileImage, phone, password, address} = data;
         const { shipping, billing} = address;
      
          if(Object.keys(data).length==0) return res.status(400).send({status:false, message:"Provide User Data"});

          if(!fname) return res.status(400).send({status:false,message:"pls provide the First Name"});
          if(!validname.test(fname.trim())) return res.status(400).send({status:false,message:"pls provide the Valid First Name"});

         if(!lname) return res.status(400).send({status:false,message:"pls provide the Last Name"});
         if(!validname.test(lname.trim())) return res.status(400).send({status:false,message:"pls provide the Valid Last Name"});
         
         if(!email) return res.status(400).send({status:false,message:"pls provide the Email"});
         if(!validemail.test(email.trim())) return res.status(400).send({status:false,message:"pls provide the Valid Email"});

         if(!phone) return res.status(400).send({status:false,message:"pls provide the phone"});
         if(!validphone.test(phone.trim())) return res.status(400).send({status:false,message:"pls provide the Valid phone"});
        
         if(!password) return res.status(400).send({status:false,message:"pls provide the password"});
         if(!validpassword.test(password.trim())) return res.status(400).send({status:false,message:"pls provide the Valid password  minLen 8, maxLen 15"});
        
         data.password=await bcrypt.hash(password,10)

         if(!address) return res.status(400).send({status:false,message:"pls provide the Address"});
     
         if(!shipping) return res.status(400).send({status:false,message:"pls provide the shipping Address"});

         if(!shipping.street) return res.status(400).send({status:false,message:"pls provide the Shipping Street"});
         if(!validstreet.test(shipping.street.trim())) return res.status(400).send({status:false,message:"pls provide the Valid Shipping Street"});
        
         if(!shipping.city) return res.status(400).send({status:false,message:"pls provide the Shipping City"});
         if(!validcity.test(shipping.city.trim())) return res.status(400).send({status:false,message:"pls provide the Valid Shipping City"});
        
         let chechpin=shipping.pincode.toString();
         if(!shipping.pincode) return res.status(400).send({status:false,message:"pls provide the Shipping Pincode"});
         if(!validpincode.test(chechpin.trim())) return res.status(400).send({status:false,message:"pls provide the Valid Shipping Pincode"});
        
         if(!billing) return res.status(400).send({status:false,message:"pls provide the billing Address"});
     
         if(!billing.street) return res.status(400).send({status:false,message:"pls provide the billing Street"});
         if(!validstreet.test(billing.street.trim())) return res.status(400).send({status:false,message:"pls provide the Valid billing Street"});
        
         if(!billing.city) return res.status(400).send({status:false,message:"pls provide the billing City"});
         if(!validcity.test(billing.city.trim())) return res.status(400).send({status:false,message:"pls provide the Valid billing City"});
        
         let chechpin2=billing.pincode.toString();
         if(!billing.pincode) return res.status(400).send({status:false,message:"pls provide the billing Pincode"});
         if(!validpincode.test(chechpin2.trim())) return res.status(400).send({status:false,message:"pls provide the Valid billing Pincode"});
       
         const userpresent = await userModel.findOne({email:email})

         if(userpresent) return res.status(200).send({status:true,message:"User Already present in DataBase"})

         data.profileImage=uploadedFileURL;
       const datacreate = await userModel.create(data);
       
       res.status(201).send({status:true,data:datacreate})

        }
    catch(err) {return res.status(500).send({msg:err})}

}


//<----------------------< LogIn User Data from DataBase >------------------->//

const logInUserData = async (req, res) => {

    try{

        const data = req.body;

        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:"Pls provide the eamilId and password"});

        const { email, password } = data;

        if(!email) return res.status(400).send({status:false,message:"Pls provide the emailId"});
        if(!validemail.test(email.trim())) return res.status(400).send({status:false,message:"pls provide the Valid Email"});
       
        if(!password) return res.status(400).send({status:false,message:"Pls provide the password"});
      
        const user = await userModel.findOne({email:email})

        if(!user) return res.status(404).send({status:false,message:"This User not register"})

        const checkpasword = await bcrypt.compare(  password, user.password )

        if(!checkpasword) return res.status(400).send({message:"Invalid password"})

        let token = jwt.sign(
            {
                userId: user._id.toString(),
            },
            'project-5-Products_Management',
            {expiresIn:"12h"}
        )

      return  res.status(200).send({ status: true, message: 'User login successfull', userId:{userId:user._id,token:token}  });
    }
    catch(err) {return res.status(500).send({msg:err})}
}

//<----------------------< Get User Data from DataBase >------------------->//

const getUserData = async (req, res) => {

    try{

        const id = req.params.userId;
        
        if(!ValidObjectId(id)) return res.status(400).send({ status: false, message: "Enter a Valid User id" });

        const data = await userModel.findById(id);

        if(!data) return res.status(400).send({message:"User not present in Database Pls Provie right Id"});

        const userObject = {
            "address": {
                "shipping": {
                    "street": data.address.shipping.street,
                    "city": data.address.shipping.city,
                    "pincode": data.address.shipping.pincode
                },
                "billing": {
                    "street": data.address.billing.street,
                    "city": data.address.billing.city,
                    "pincode": data.address.billing.pincode
                }
            },
            "_id": data._id,
            "fname": data.fname,
            "lname": data.lname,
            "email": data.email,
            "profileImage": data.profileImage,
            "phone": data.phone,
            "password": data.password

        }

        res.status(200).send({status:true,message:"User profile details",data:userObject})
    }
    catch(err) {return res.status(500).send({msg:err})}
}

//<----------------------< Update User Data from DataBase >------------------->//
const updateUserData = async (req,res)=>{
    try{

        const id = req.params.userId;
        
        if(!ValidObjectId(id)) return res.status(400).send({ status: false, message: "Enter a Valid User id" });

        const data= req.body ;

        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:"Body is Empty Pls provide the data"});

        const { fname, lname, email, profileImage, phone, password, address} = data;

         const { shipping, billing} = address;


         const checkUser = await userModel.findById(id);

        if(!checkUser) return res.status(400).send({status:false,message:"User not present in Database Pls Provie right Id"});

    }
    catch(err){ return res.status(500).send({message:err})}
}



//<----------------------< Exports : UserFunction >------------------------>//
module.exports = { createUser, logInUserData, getUserData, updateUserData }