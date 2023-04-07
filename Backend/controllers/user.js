const bcrypt= require('bcrypt')
var jwt = require('jsonwebtoken');
const User= require('../models/user')

exports.postSignup = async(req ,res,next)=>{

    try {
        const {name, email, password , phone } = req.body ;

        if(!name || !email || !password || !phone){
            return res.status(400).json({message:'add all fields'})
        }

        const user = await User.findAll({where:{email}});
        if(user.length>0){
            return res.status(409).json({message:'user already exist'})
        }
        console.log( typeof(phone))

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            console.log(hash)
            await User.create({ name , email ,password:hash , phone})
            return res.status(201).json({message:'successfully created new user'})
        });
        
    
    } catch (err) {
        res.status(500).json(err);
    }
    
}
