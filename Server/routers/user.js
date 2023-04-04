const express=require('express');

const router=express.Router();
const{registerUser,loginUser,userProfile}=require('../controllers/user');
const auth=require('../middlewares/auth');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getprofile',auth,userProfile);
module.exports=router;