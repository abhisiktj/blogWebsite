import logo from '../assets/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import loginContext from '../utils/loginContext'


const Logo=()=>{
    return(
       <div className='w-20 p-1'>
        <img src={logo} alt="logo not available"></img>
        <a href='/'></a>
       </div>
    )
}
const Utilities=()=>{
    const {login,setLogin}=useContext(loginContext)
    const navigate=useNavigate();
    const logoutHandler=()=>{
        localStorage.removeItem('token');
        setLogin({status:false});
        alert("User Logged out");
        navigate('/');
    }
    return(
        <ul className='flex justify-around'>
            <li className='px-2'><Link to="/">Home</Link></li>
            <li className='px-2'><Link to="/register">register</Link></li>
            <li className='px-2'><Link to="/about">About</Link></li>
            { !login.status?
            ( <li className='px-2'><Link to="/login">Login</Link></li>):
            (  <li className='px-2'><button onClick={logoutHandler}>Logout</button></li>   )
        }
        </ul>
    )
}
const Header=()=>{
    return(
        <div className='bg-slate-400 flex justify-between items-center'>
        <Logo />
        <Utilities />
        </div>
    )
}

export default Header;