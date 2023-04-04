const User=require('../models/user');
const jwt=require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.json({message:"Invalid token"});
    }
    const token = authHeader.split(' ')[1]
    try {
      const payload = jwt.verify(token,process.env.JWT_SECRETKEY)
    
      req.user = { username: payload.username, name: payload.name }
      next()
    } catch (error) {
        console.log(error);
        res.json({message:"Invalid token"});
    }
  }
  
  module.exports = auth
