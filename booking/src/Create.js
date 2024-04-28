import axios from 'axios';
import React, {useContext, useState } from 'react';
import { usercontext } from './App';


const Create = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const user = useContext(usercontext); 
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);
        formData.append('email', user.email);
        axios.post('http://localhost:5000/create', formData)
            .then(res => {
                const response = res.data;
                if (response === 'success') {
                    window.location.href = '/home';
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <button type='submit'>Post it</button>
            </form>
        </div>
    );
};

export default Create;
