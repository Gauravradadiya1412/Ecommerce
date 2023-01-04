const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req,res) => {
   
    try{

        let {name, email, password} = req.body

         password = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password,
            avatar : {
                public_id : "sbsdf",
                url:'nhucfsiufhsd'
            }
        })

        res.status(201).send({success : true,user})

    }catch(err){
        console.log("registerUser error :: ",err)
        res.status(400).send({success:false, message : 'internal server error'})
    }
}