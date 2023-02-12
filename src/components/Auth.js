import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Auth = ({user}) => {
  const url = "https://gavel-server.onrender.com/dashboard";
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(url, {headers: 
    {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then((res) => {
    // console.log(res);
    if(res.data.status == false) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      if(res.data.userType == "regUser") {
        user(res.data.userDetails);
        navigate("/auth/dashboard");
      } else if(res.data.userType == "Lawyer") {
        user(res.data.userDetails);
        navigate("/auth/attorney");
      }
    }
  })
  }, []);
  return (
    <div>Auth</div>
  )
}

export default Auth;