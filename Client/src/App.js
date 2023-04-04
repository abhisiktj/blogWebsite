import ReactDom from 'react-dom/client'
import React, { Children, useEffect, useState } from 'react';

//importing Components
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About'
import Blog from './components/Blog';
import Error from './components/Error';
import blogContext from './utils/blogContext';
import userContext from './utils/userContext';
import loginContext from './utils/loginContext';
import AddBlogForm from './components/AddBlogForm';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

import {Outlet,createBrowserRouter,RouterProvider} from 'react-router-dom'

const AppLayout=()=>{
    const [blogs,setBlogs]=useState(null);
    const [filterBlogs,setFilterBlogs]=useState(null);
   const [user,setUser]=useState(null);
const [login,setLogin]=useState({status:false});

    useEffect(()=>{
        getData();
     },[])

     const getData=async()=>{
        const data=await fetch("/api/blog");
        const json=await data.json();
        setBlogs(json.blogs);
        setFilterBlogs(json.blogs);
     }

    return(
    
        <>
          {/* {(console.log(blogs))} */}
          <loginContext.Provider value={{login,setLogin}}>
          <userContext.Provider value={{user,setUser}}>
          <blogContext.Provider
          value={{
              blogs,filterBlogs,setBlogs,setFilterBlogs
          }}
         >
        <Header />
        <Outlet />
        </blogContext.Provider>
        </userContext.Provider>
        </loginContext.Provider>
    </>
    )
}

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/",
          element: <Body />,
        },
        {
            path:'/blog/:id',
            element:<Blog />
        },
        {
          path:'/addblogs',
          element:<AddBlogForm />
        },
        {
          path:'/register',
          element:<RegisterForm />
        },
        {
          path:'/login',
          element:<LoginForm />
        },
       {
            path:'/profile',
            element:<Profile />
       }
        
      ],
    },
  ]);

const root=ReactDom.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)