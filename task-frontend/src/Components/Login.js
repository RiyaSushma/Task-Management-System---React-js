import React, { useState } from "react";
import './Login.css';
import { useStateValue } from "../state/context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [, dispatch] = useStateValue();
    const [loginCredentials, setLoginCredentials] = useState({EmailId:"", password:""});
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(JSON.stringify({EmailId: loginCredentials.EmailId, password: loginCredentials.password}));
        const response = await fetch("http://localhost:8000/auth/api/login-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({EmailId: loginCredentials.EmailId, password: loginCredentials.password})
        });

        const responseJson = await response.json();
        if(!responseJson.success) {
            alert("Enter valid credentials");
        } else {
            const userData = {"authToken": responseJson.authToken, "emailId": responseJson.emailId,
            "username": responseJson.username, "profileImg": responseJson.profileImg, "userId": responseJson.userId
            };
            localStorage.setItem("user", JSON.stringify(userData));
            const user = JSON.parse(localStorage.getItem("user"));
            console.log("hello user: ", user);
            console.log(userData);

            dispatch({
                type: 'SET_USER',
                user: userData,
            });

            navigate('/home');
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setLoginCredentials({...loginCredentials, [e.target.name]: e.target.value});
        e.target.style.border = "0.25rem solid lightgreen";
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <h4>Welcome to Tasket!!</h4>
            </div>
            <div className="login-box">
                <h4>Login</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" onChange={handleChange} placeholder="Enter Email Id" name="EmailId"/>
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Enter Password" name="password"/>
                </div>
                <div className="form-btn">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/create-user">New User?</Link>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Login;