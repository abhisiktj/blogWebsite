import { useState } from "react";

const Carousel=({images})=>{

    const[index,setIndex]=useState(0);


    const handleNext=()=>{
        if(index===images.length-1){
          setIndex(0);}
        else{
         setIndex(index+1);}
    }
    const handlePrevious=()=>{
        if(index===0){
         setIndex(images.length-1);}
        else{
         setIndex(index-1);}
    }

    return(
        <div>
              <img src={images[index]}></img>
             <button className="bg-slate-600 p-2 m-1" onClick={handlePrevious}>prev</button>
            <button  className="bg-slate-600 p-2 m-1"  onClick={handleNext}>next</button>

        </div>
    )
}

export default Carousel;