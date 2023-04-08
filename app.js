const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()
const sequelize = require('./Backend/util/database')

const User = require('./Backend/models/user')
const Chat = require('./Backend/models/chat')
const userRoutes = require('./Backend/routes/user')


const app = express();

app.use(cors({
    origin:"*",
    credentials:true,

}))

app.use(bodyParser.json({extended:false}))

app.use('/user',userRoutes)

Chat.belongsTo(User);
User.hasMany(Chat);

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log('running now')
    })
})

.catch(err=>{
    console.log(err)
})
