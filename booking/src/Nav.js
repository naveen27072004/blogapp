import React, { useContext } from 'react'; 
import { Link ,useNavigate} from 'react-router-dom';
import { usercontext } from './App'; 
import axios from 'axios';

const Nav = () => {
  const user = useContext(usercontext); 
  const navigate=useNavigate()
const handlelogout =()=>{
  axios.get('http://localhost:5000/logout/')
  .then(res=>{
    const dataa=res.data
    if(dataa === 'sucess'){navigate(0)}
  }).catch(err=>console.log(err))
}

  return (
    <div>
      <h1>Blog app</h1>
      <Link to="home"><h1>home</h1></Link><br />
      {user.username ? <Link to="create"><h1>Create</h1></Link>:<></>}
      
      <h1>conyact</h1>
      <div>
        
        {user.username ? (
       <div><input type="button" value="logout" onClick={handlelogout} /></div>
       
        ) : (
          <div><h2><Link to="reg">register/login</Link></h2></div>
          
        )}
      </div>
    </div>
  );
}

export default Nav;
