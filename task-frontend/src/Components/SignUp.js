import React, { useState } from "react";
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [credentials, setCredentials] = useState({name: "", EmailId: "", password: "", profileImg: ""});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(JSON.stringify({ name: credentials.name, EmailId: credentials.EmailId, password: credentials.password, profileImg: credentials.profileImg || "https://cdn-icons-png.flaticon.com/512/6386/6386976.png" }));
        const response = await fetch("http://localhost:8000/auth/api/create-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, EmailId: credentials.EmailId, password: credentials.password, profileImg: credentials.profileImg || "https://cdn-icons-png.flaticon.com/512/6386/6386976.png" }),
        });

        const responseJson = await response.json();
        console.log(responseJson);
        if(!responseJson.success) {
            alert("Enter valid credentials");
        } else {
            navigate('/');
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        e.target.style.border = "0.25rem solid lightgreen";
    }

    return (
        <div className="signup-container">
            <div className="signup-header">
                <h4>Welcome to Tasket!!</h4>
            </div>
            <div className="signup-box">
                <h4>Create Account</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input type="text" className="form-control" id="name" aria-describedby="username" onChange={handleChange} placeholder="Enter username" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="EmailId" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="EmailId" aria-describedby="email" onChange={handleChange} placeholder="Enter email" name="EmailId"/>
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={handleChange}/>
                </div>
                <div className="form-btn">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/">Already a user? Login here!</Link>
                </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;