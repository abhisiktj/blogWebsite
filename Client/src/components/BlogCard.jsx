const BlogCard=(props)=>{
  const {author,title,thumbnail}=props;
    return(
       <div  className="bg-slate-300 w-40 p-3 m-3">
       <p className="p-1">{author}</p>
       <p className="p-1">{title}</p>
       <img className="w-full" src={thumbnail} alt="no image to display"></img>
       </div>
    )
}
export default BlogCard;