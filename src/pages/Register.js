import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lawyer, setLawyer] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Gavel || Register";
  });

  const signUp = () => {
    if(first_name===""&&last_name===""&&email===""&&phoneNumber===""&&password===""){
      setError("Invalid credentials")
    }
    else if (first_name===""||last_name===""||email===""||phoneNumber===""||password==="") {
        setError("Fill all fields")
    }  
    else {
        let url;
        setError(false);
        setIsLoading(true);
        if(lawyer == false) {
          url = "https://gavel-server.onrender.com/users/register";
        } else {
          url = "https://gavel-server.onrender.com/attorneys/register";
        }
        axios.post(url, {first_name, last_name, email, phoneNumber, password}).then((res) => {
          setIsLoading(false);
          if(res.data.status == false) {
            setError(res.data.message);
          } else {
            navigate("/login");
          }
        }).catch((err) => {
          setIsLoading(false);
          setError(err.message);
        })
        
      }
  }
  return (
    <div className='bg-image'>
      <div className='container'>
        <div className='row'>
          <div className='container col-6'>
            <h4 className='my-2 display-4 text-center'>Register</h4>
            {error && <div className='alert alert-danger text-danger text-center'>{error}</div>}
            <input className='w-100 form-control my-3' placeholder='Firstname' value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
            <input className='w-100 form-control my-3' placeholder='Lastname' value={last_name} onChange={(e) => setLast_name(e.target.value)} />
            <input className='w-100 form-control my-3' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='w-100 form-control my-3' placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input  type={showPwd ? "text" : "password"} className='w-100 form-control my-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>
              <span className='mx-5 text-white'><input type="checkbox" onClick={() => setShowPwd(!showPwd)} /> Show Password</span> <span className='mx-5 text-white'><input type="checkbox" onClick={() => setLawyer(!lawyer)} /> Register as a lawyer</span>
            </p>
            <button className='btn btn-outline-gavel w-100' onClick={signUp} >{isLoading ? <span className='spinner-border'></span> : "Register"}</button>
            <p className='text-white'>Already have an account? <Link to="/login"> Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;