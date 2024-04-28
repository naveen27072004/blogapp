import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  
const [email,setemail]=useState('')
const [password,setpass]=useState('')
const navigate=useNavigate()
const onnSubmit=(e)=>{
e.preventDefault()
axios.post('http://localhost:5000/login/',{email,password})
.then(res=>{
  const response=(res.data);
  if(response === 'sucess'){
   window.location.href='/home'
  }
})
.catch(error=>console.log(error))
}
  return (
    <div><h1>login</h1>
    <form onSubmit={onnSubmit}>
<input type="e-mail" onChange={e=>setemail(e.target.value)} /><br />
<input type="password" onChange={e=>setpass(e.target.value)} /><br />
<button type='submit'>submit</button>
</form>
<p>new user</p>

    </div>
  )
}

export default Login