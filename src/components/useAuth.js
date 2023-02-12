import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const useAuth = (setUser) => {
  const url = "https://gavel-server.onrender.com/dashboard";
  // let status, user, userType;
  // const [status, setStatus] = useState(false)
  // const [user, setUser] = useState("")
  // const [userType, setUserType] = useState("")
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
    console.log(res.data);
    if(res.data.status == false) {
      localStorage.removeItem("token");
      // setStatus(false);
      navigate("/login");
    } else {
      if(res.data.userType == "regUser") {
        // setStatus(true);
        // setUser(res.data.userDetails);
        // setUserType("regular")
        navigate("/auth/dashboard");
      } else if(res.data.userType == "Lawyer") {
        // setStatus(true);
        // setUser(res.data.userDetails);
        // setUserType("attorney")
        navigate("/auth/attorney");
      }
    }
  })
  }, []);
  return {status, user, userType};
}

export default useAuth;