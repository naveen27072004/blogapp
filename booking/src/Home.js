   import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Home = () => {
  const [post,setpost]=useState([])
  
  useEffect(()=>{
axios.get('http://localhost:5000/getpost/')
.then(result=>setpost(result.data))
.catch(err=>console.log(err))
  },[])
  // console.log("post",post)
  return (
    <div>
    {post.map(posts => (
      <Link to={`/edit/${posts._id}`}>
      <div key={posts.id}>
        <div><img src={`http://localhost:5000/images/${posts.file}`} alt="" srcset="" width={'100px'} height={'100px'}/></div>
        <h2>{posts.title}</h2>
        <p>{posts.body}</p>
        
      </div>
      </Link>
    ))}
  </div>

  )
}

export default Home