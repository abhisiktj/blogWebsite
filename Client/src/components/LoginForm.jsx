import { useState,useContext} from "react"
import loginContext from '../utils/loginContext';
import  axios  from "axios";
import {useFormik} from 'formik';
import { useNavigate } from "react-router-dom";
import loginContext from "../utils/loginContext";
const LoginForm=()=>{
const navigate=useNavigate();
const {login,setLogin}=useContext(loginContext);

   const formik=useFormik({
       initialValues:{
           username:"",
           password:"",
       },
       onSubmit:async(values)=>{
           const formData=new FormData();
           formData.append('username', values.username);
           formData.append('password', values.password);
          
  

         const response=await axios.post('/api/user/login',formData,{
          headers: {
            'Content-Type': 'application/json'
          }
        });
          const data=response.data;
          console.log(data);
          if(data.user){
            localStorage.setItem('token', data.user)
            setLogin({
              status:true
        })
            alert('Login successful')
             navigate('/profile')
            
          }
          else{
            alert("username or password field wrong");
          }
       }
   });

   return(
       <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>

       <input
        className='border-gray-900'
          placeholder='Username'
          name="username"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.username}
       />

       <input
        className='border-gray-900'
          placeholder='Password'
          name="password"
       type="password"
       onChange={formik.handleChange}
       value={formik.values.password}
       />


      
     <button
     className='bg-slate-200'
     type="submit"
     >
      Submit
     </button>

       </form>
   )

}

export default LoginForm;