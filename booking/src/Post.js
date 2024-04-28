import axios from 'axios'
import React, {useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usercontext } from './App'

const Post = () => {
  const navigate=useNavigate()
    const {id}=useParams()
    const [post,setpost]=useState({})
    const user = useContext(usercontext); 
    useEffect(()=>{
        axios.get('http://localhost:5000/getpostbyid/'+id)
        .then(result=>setpost(result.data))
        .catch(err=>console.log(err))
    },[])
    const handledlt=(id)=>{
axios.delete('http://localhost:5000/getdltbyid/'+id)
.then(res => {
  const response = res.data;
  if (response === 'sucess') {
      window.location.href = '/home';
  }
})
.catch(err=>console.log(err))
    }
  return (
    <div><h1>
        <img src={`http://localhost:5000/images/${post.file}`} alt="" srcset="" height={'250px'} width={'250px'} />
        <h1>{post.title}</h1>
        </h1>{
          user.email === post.email ? <> <button> <Link to={`/editpost/${post._id}`}>edit</Link>  </button>
          <button onClick={e=>handledlt(post._id)}>delet</button></> :<></>
        }
       
        </div>
        
  )
}

export default Post