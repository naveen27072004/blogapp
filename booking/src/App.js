
import React,{ useState,useEffect,createContext } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import axios from 'axios'
import './App.css';
import Nav from './Nav';
import Reg from './Reg';
import Login from './Login';
import Home from './Home';
import Create from './Create';
import Post from './Post';
import Edit from './Edit';
export const usercontext=createContext()
function App() {
 const [user,setuser]=useState({})
 axios.defaults.withCredentials=true
  useEffect(()=>{
    axios.get('http://localhost:5000/home')
    .then(user=>{
      const dataa=user.data
      setuser(dataa);
    })
    .catch(err=>console.log(err))
  })


  return (
    <div className="App">
      <usercontext.Provider value={user}>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="reg" element={<Reg/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/fullpost' element={<Post/>}></Route>
        <Route path='/edit/:id' element={<Post/>}></Route>
        <Route path='/editpost/:id' element={<Edit/>}></Route>
      </Routes>
      </BrowserRouter>
      </usercontext.Provider>
</div>
  );
}

export default App;
