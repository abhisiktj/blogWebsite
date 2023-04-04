import axios from 'axios';
import {useFormik} from 'formik';
import userContext from '../utils/userContext';
import loginContext from '../utils/loginContext';
import { useContext } from 'react';
import NotAvailble from './NotAvailable';
const AddBlogForm=()=>{
const {login,setLogin}=useContext(loginContext);
const {user,setUser}=useContext(userContext);

console.log(login.status);
if(!login.status){
   return <NotAvailble />
}
    const formik=useFormik({
        initialValues:{
            author:user?.name || "",
            title:"",
            description:"",
            thumbnail:null,
            carousel:null
        },
        onSubmit:async(values)=>{
            const formData=new FormData();
            formData.append('author', values.author);
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('thumbnail', values.thumbnail);
   
            for (const image of values.carousel) {
              formData.append("carousel", image);
            }
           
          const data=await axios.post('/api/blog/addblog',formData,{
            headers:{
              "authorization":"Bearer "+localStorage.getItem('token')
            }
          });
          console.log(formData);
          console.log(data);
        }
    });

    return(
        <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>

        <input
        className='border-gray-900'
        placeholder='Author'
         name="author"
        type="text"
        readOnly
        value={user?.name}
        />

        <input
         className='border-gray-900'
           placeholder='Title'
           name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        />

        <input 
         className='border-gray-900'
         type="textarea"
         name="description"
         placeholder='description'
         onChange={formik.handleChange}
        />

        <input 
         className='border-gray-900'
          type="file"
          name="thumbnail"
          onChange={(e)=>{
            formik.setFieldValue('thumbnail',e.currentTarget.files[0]);
          }}
        />

        <input 
         className='border-gray-900'
          type="file"
          name="carousel"
          multiple
          onChange={(e)=>{
            formik.setFieldValue('carousel',e.currentTarget.files);
          }}
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
export default AddBlogForm;
