const User = require('../models/user');
const Chat = require('../models/chat');

exports.postMessage= async(req, res, next) => {

    try{

        const {message} = req.body;
        console.log(req.user);
        console.log(message);

        if(!message){
            return res.status(400).json({message: 'nothing entered'});
        }

        const data = await req.user.createChat({message});
        const name = req.user.name;

        const arr = [];
        const details = {
            id: data.id,
            name: req.user.name,
            message: data.message,
            creaatedAt: data.createdAt
        }

        arr.push(details);
        res.status(201).json({arr, message: 'chat message successfully added'});

    }

    catch(err){
        res.status(500).json({message: 'unable to add chat message'+ err})
    }
}

