const express=require('express');
const router=express.Router();
const {getAllBlogs,addBlog,getBlogById}=require('../controllers/blogs')
const uploadMultiple =require('../middlewares/multer')
const auth=require('../middlewares/auth');

router.get('/',getAllBlogs);
router.get('/:id',getBlogById);
router.post('/addblog',auth,uploadMultiple,addBlog);

module.exports=router;