const userModel = require('../models/userModel.js');
const productModel = require('../models/productModel.js')
const cartModel = require('../models/CartModel.js');
const { ValidObjectId } = require('../validation/validData.js')


const createCart = async (req,res) =>{

    try{
        const USerId = req.params.userId;
        const data = req.body;
        
        if(!ValidObjectId(USerId)) return res.status(400).send({status:false,message:"pls provide the right USerId"});

        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:"pls provide the Cart data"});

        const {productId,quantity,cartId} = data;
        
        const checkUser = await userModel.findById(USerId);

        if(!checkUser) return res.status(404).send({status:false, message:"Not Found user"});

        if(!productId) return res.status(400).send({status:false,message:"provide the ProductId"});

        if(!ValidObjectId(productId)) return res.status(400).send({status:false,message:"Pls provide the Valid ProductId"});
        
         const checkProduct = await productModel.findOne({_id:productId,isDeleted:false});
         
         if(!checkProduct) return res.status(404).send({status:false,message:"ProductId not Found"});

         if(!quantity){
            quantity=1;
        }
        if(typeof quantity != Number && quantity <=0 ){
            return res.status(400).send({ status: false, message: "Enter valid Quantity" })
        }

        //if(!cartId) return res.status(400).send({status:false,message:"provide the cartId"});
         
        //const cart = await cartModel.findById(cartId);

       


    }
    catch(err) { return res.status(500).send({status:false,message:err.message})}
}


//<----------------------< Exports : UserFunction >------------------------>//
module.exports = { createCart }