import { useState } from "react";
import axios from 'axios';

export default function Register() {

    const [name,setName ] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name,email,password)
        axios.post('http://localhost:3001/api/auth/register', {name,email,password} )
        .then(function (response) {
            // handle success
            localStorage.setItem('token',response.data.token );
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }
    return (
        <>
            <h1> Register Form </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input required type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
                <br/>
                <label htmlFor="email">Email:</label>
                <input required type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <label htmlFor="password">Password:</label>
                <input required type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <input type="submit" value="Register"/>
            </form>
        </>
    );

  }