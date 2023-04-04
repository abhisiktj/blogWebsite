import { useRouteError } from "react-router-dom"

const Error=()=>{
    const error=useRouteError();
    console.log(error);
    
    return(
   <p>Err</p>
    )
}
export default Error;