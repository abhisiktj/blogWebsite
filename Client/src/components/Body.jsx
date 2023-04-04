import {useState,useContext } from "react"
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import blogContext from '../utils/blogContext'

const Body=()=>{
    const [searchText,setSearchText]=useState("");
    const {blogs,filterBlogs,setBlogs,setFilterBlogs}=useContext(blogContext);
    const findBlogs=(searchText,blogs)=>{

         return blogs?.filter((blog)=>{
            return blog?.author?.toLowerCase().includes(searchText.toLowerCase());
         })
    }

    return(
        <>
        <input placeholder="Search"
          value={searchText}
          onChange={(event)=>{
            setSearchText(event.target.value);
           setFilterBlogs(findBlogs(event.target.value,blogs));
          }}

        ></input>
        <div className="flex justify-start flex-wrap">
          {filterBlogs?.map((blog)=>{
                    return <Link to={"/blog/" +blog._id}  key={blog._id}><BlogCard {...blog}/></Link>
            })}
        </div>
        </>
    )
}
export default Body