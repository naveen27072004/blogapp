import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {
    const [title, setTitle] = useState('');
    const{id}=useParams()
    const handleSubmit = (e) => {
        e.preventDefault();
       
        
        axios.put('http://localhost:5000/editpost/'+id, {title})
            .then(res => {
                const response = res.data;
                if (response === 'sucess') {
                    window.location.href = '/home';
                }
            })
            .catch(error => console.log(error));
    };
    useEffect(()=>{
      axios.get('http://localhost:5000/getpostbyid/'+id)
      .then(result=>setTitle(result.data.title))
      .catch(err=>console.log(err))
    },[])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='title' value={title} onChange={e => setTitle(e.target.value)}  />
                
                <button type='submit'>Post it</button>
            </form>
        </div>
    );
};

export default Edit;
