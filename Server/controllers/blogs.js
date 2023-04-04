const mongoose =require('mongoose');
const cloudinary=require('cloudinary');

const expressAsyncHandler=require('express-async-handler');

const Blog=require('../models/blog');


const getAllBlogs=expressAsyncHandler(async(req,res)=>{
    
    const blogs= await Blog.find({});
    res.status(200).json({blogs})
})

const getBlogById=expressAsyncHandler(async(req,res)=>{
      
    const blog=await Blog.findById({_id:req.params.id});
    console.log(blog);
    res.status(200).json(blog);

})

const addBlog=expressAsyncHandler(async(req,res)=>{

const {author,title,description}=req.body;
const thumbnail=req.files.thumbnail[0];
const carousel=req.files.carousel;

const result=await cloudinary.v2.uploader.upload(thumbnail.path,{
    folder:'Blog Website/Thumbnail',
    use_filename:true
})
const thumbnailUrl=result.secure_url;
    let carouselUrl=[];

    for(i=0;i<carousel.length;i++){
       let result =await cloudinary.v2.uploader.upload(carousel[i].path,{
            folder:'Blog Website/Carousel',
            use_filename:true
        });
        carouselUrl.push(result.secure_url);
    }

const blog =await Blog.create({
    author,title,description,
    carousel:carouselUrl,
    thumbnail:thumbnailUrl
})
console.log(blog);
res.status(200).json({success:true});

})

module.exports={getAllBlogs,getBlogById,addBlog};