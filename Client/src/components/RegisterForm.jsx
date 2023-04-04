import { useState,useContext } from "react"
import  axios  from "axios";
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import loginContext from "../utils/loginContext";


const RegisterForm=()=>{
  const {login}=useContext(loginContext);
  if(login.status){
    return <p>Already logged in</p>
  }
const navigate=useNavigate();
   const formik=useFormik({
       initialValues:{
           name:"",
           username:"",
           password:"",
       },
       onSubmit:async(values)=>{
           const formData=new FormData();
           formData.append('name', values.name);
           formData.append('username', values.username);
           formData.append('password', values.password);
          
  

         const response=await axios.post('/api/user/register',formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
       console.log(response);
       const data=response.data;
        if(data.success===true){
            navigate("/login");
      }
       }
   });

   return(
       <form onSubmit={formik.handleSubmit}>

       <input
       className='border-gray-900'
       placeholder='Name'
        name="name"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.name}
       />

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

export default RegisterForm;