require('dotenv').config();
const express=require('express');
const connectDB=require('./db/connectDB');
const app=express();
const blogRouter=require('./routers/blogs');
const userRouter=require('./routers/user');
const cloudinary=require('cloudinary');
const cors=require('cors');

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
// app.use(cors);

app.use('/blog',blogRouter);
app.use('/user',userRouter);


const port= process.env.PORT || 3000;

const start=async()=>{
   try {
           await connectDB(process.env.MONGO_URI)
       app.listen(port,()=>{
        console.log(`server started on ${port}`);
       })
   } catch (error) {
       console.log(error);
   }
}

start();

