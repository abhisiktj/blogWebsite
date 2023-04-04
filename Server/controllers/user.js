const expressAsyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const bcrypt=require('bcryptjs');

const registerUser=expressAsyncHandler(async(req,res)=>{

  const{name,username,password}=req.body;
  const salt=await bcrypt.genSalt(10);
  const hash=await bcrypt.hash(password,salt);
    const user=await User.create({
         name,username,password:hash
    })
    
    res.json({success:true});
});

const loginUser=expressAsyncHandler(async(req,res)=>{
  const user= await User.findOne({username:req.body.username});
  if(!user){
    res.json({success:false});
  }
  const password=req.body.password;
  const equal=await bcrypt.compare(password,user.password);
  if(!equal){
    res.json({success:false});
  }

  const token=jwt.sign({
    name:user.name,
    username:user.username
  },process.env.JWT_SECRETKEY);


    res.json({success:true,user:token});


});

const userProfile=expressAsyncHandler(async(req,res)=>{
  const user=req.user;
  res.json(user);
})

module.exports={registerUser,loginUser,userProfile};