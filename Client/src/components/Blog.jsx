import { useParams } from "react-router-dom";
import blogContext from "../utils/blogContext";
import { useContext, useState,useEffect} from "react";


import Carousel from '../components/Carousel'
const Blog=()=>{
  console.log("blogging");
  const params=useParams();

  const [data,setData]=useState("");

  useEffect(()=>{
      getData()
    },[])

    const getData=async()=>{
      const blog=await fetch(`/api/blog/${params.id}`)
      const json=await blog.json();
      setData(json);
    }

  if(!data)
    return null
  
    console.log(data);
    return (
    
      <div>
        <p>{data?.author}</p>
        <p>{data?.username}</p>

        {(data?.carousel.length===0)?null :
        <Carousel images={data?.carousel} />}

        <p>{data?.description}</p>
         
      </div>
    )
}
export default Blog;