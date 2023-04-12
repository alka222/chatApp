const express =require('express');
const router = express.Router();

const userAuthenticate = require('../middleware/auth')
const groupController = require('../controllers/group')
const usergroupController = require('../controllers/usergroup')

router.get('/getgroups', userAuthenticate.authentication , groupController.getGroups  )
router.post('/create-group' , userAuthenticate.authentication , groupController.createGroup)


module.exports = router;