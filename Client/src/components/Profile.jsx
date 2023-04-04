import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useEffect,useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from "react";
import userContext from '../utils/userContext';
import loginContext from '../utils/loginContext';
import NotAvailable from './NotAvailable';
const Profile=()=>{

  const {user,setUser}=useContext(userContext);
  const {login,setLogin}=useContext(loginContext);
   
  console.log(login);
  const navigate=useNavigate();
  const getProfile=async()=>{
    const response=await axios.get("/api/user/getProfile",{
      headers:{
        "authorization":"Bearer "+localStorage.getItem('token')
      }
    })
    const data=response.data;
    setUser({
      name:data.name,
      username:data.username
    })
    setLogin({
          status:true
    })
  }
  const handleLogout=()=>{
    localStorage.removeItem('token');
    setLogin({
      status:false
})
    navigate('/');
  }
  useEffect(()=>{
   
   const token=localStorage.getItem('token');

     if(token){
      const user=jwt.decode(token);
      if(!user)
      {
        localStorage.removeItem(token);
          navigate('/login');
      }
      else{
        getProfile(); 
      }
     }
  },[]);
console.log(login);

  return !login?.status ? <NotAvailable />:(
    <>
   <p>Name:{user?.name}</p>
   <p>UserName:{user?.username}</p>
   <button
   onClick={handleLogout}
   >Logout</button>
   <Link to="/addblogs"><button>Add Blog</button></Link>
   </>
  )
}
export default Profile;