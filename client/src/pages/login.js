import { useState } from "react";
import axios from "axios";

export default function Login() {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/login', {email,password} )
        .then(function (response) {
            // handle success
            localStorage.setItem('userLoginToken',response.data.token );
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    }
    return (
        <>
            <h1> Login Page </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input required type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input required type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}
  