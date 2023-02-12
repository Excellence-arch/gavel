import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login_image from "../login_image_2.jpg"

const Login = () => {
    const navigate = useNavigate();
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lawyer, setLawyer] = useState(false);

    useEffect(() => {
        document.title = "Gavel || Login";
    });

    const login = () => {
        if(email===""&&password===""){
            setError("Invalid credentials")
        }

        else if(email===""||password===""){
            setError("Fill all fields")
        }
        else{
            setIsLoading(true);
            setError(false);
            let url;
            if(lawyer == true) {
                url = "https://gavel-server.onrender.com/attorneys/login"
            } else {
                url = "https://gavel-server.onrender.com/users/login"
            }
            axios.post(url, {email, password}).then((res) => {
                setIsLoading(false);
                if(res.data.status == false) {
                    localStorage.removeItem("token");
                    setError(res.data.message);
                } else {
                    localStorage.setItem("token", res.data.token);
                    if(lawyer == true) {
                        navigate("/attorney")
                    } else {
                        navigate("/dashboard");
                    }
                }
            }).catch((err) => {
                localStorage.removeItem("token");
                setIsLoading(false);
                setError(err.message);
            })
            
        }
    }
  return (
    <div className='d-flex flex-lg-row flex-sm-column flex-md-column flex-column flex-column-reverse flex-md-column-reverse flex-sm-column-reverse'>
        <div className="col-lg-5 col-sm-12">
            <div className='row'>
                <div className='container mx-2 mt-lg-5 mt-3'>
                    
                    <h4 className='display-4 text-center my-2'>Login</h4>
                    {error && <div className='alert alert-danger text-danger text-center'>{error}</div>}
                    <p className='floats mx-3'><input type="checkbox" onClick={() => setLawyer(!lawyer)}/> Login as a Lawyer</p>
                    <input className='form-control w-100 my-3' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className='form-control w-100 my-3' placeholder='Password' />
                    <div className=''>
                        <span className='mx-5'><input type="checkbox" onClick={() => setShowPwd(!showPwd)} /> Show Password </span>
                        <Link to="/forgot-password" className='mx-5'>Forgot password?</Link>
                    </div>
                    <button className="btn btn-outline-gavel w-100 my-3" onClick={login}>{isLoading? <span className='spinner-border'></span>: "Login"}</button>
                    <p className='text-center'>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
        <div className='col-lg-7 col-sm-12'>
            <img src={login_image} alt="Law" className='w-100 height' />
        </div>
    </div>
  )
}

export default Login;