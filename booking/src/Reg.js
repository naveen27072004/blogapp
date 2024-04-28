import { useState } from 'react'
import{Link} from 'react-router-dom'
import axios from 'axios'

const Reg = () => {
const [username,setname]=useState('')
const [email,setemail]=useState('')
const [password,setpass]=useState('')

const onnSubmit=(e)=>{
e.preventDefault()
axios.post('http://localhost:5000/reg/',{username,email,password})
.then(res=>console.log(res))
.catch(error=>console.log(error))
}
  return (
    <div>  
<form onSubmit={onnSubmit}>
<input type="text" onChange={e=>setname(e.target.value)} /><br />
<input type="e-mail" onChange={e=>setemail(e.target.value)} /><br />
<input type="password" onChange={e=>setpass(e.target.value)}/><br />
<button type='submit'>submit</button>
</form>
<p>alredy have account</p>
<Link to='/login'>goo loging</Link>
    </div>
  )
}

export default Reg