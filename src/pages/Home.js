import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './Home.css'

const Home = () => {
  const navigate=useNavigate()
  const[city,setCity]=useState('')
  const[region,setRegion]=useState('')
  
  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition((response)=>{
      const rc=response.coords;
      const latitude=rc.latitude;
      const longitude=rc.longitude;
      const title="Help!!"
      axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${longitude},${latitude}`).then((res) => {
        setCity(res.data.address.City)
        setRegion(res.data.address.region)
        const urls = "https://gavel-server.onrender.com/post"
        axios.post(urls, {email: user.email, title, body:`Help! My location is ${res.data.address.City},${res.data.address.Region}. Latitude ${latitude}, and longitude ${longitude}!`}).then((res) => {
          if(res.status == false) {
            alert("Not sent")
          } else {
            navigate("/");
          }
        })
      })
    })
  }
  const [user, setUser] = useState("")
  const url = "https://gavel-server.onrender.com/dashboard";
  useEffect(() => {
      document.title = "Gavel || Home";
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
            setUser(res.data.userDetails);
        } else if(res.data.userType == "Lawyer") {
            setUser(res.data.userDetails);
        }
        }
    })
    }, []);
  
  return (
    <div>
      <Navbar />
      <div className='home_background text-center'>
        <div className='fs-5 text text-light'>Justice for One, Justice for all</div>
        <div className='fs-1 text text-light'>LET US BRIDGE THE GAP FOR YOU</div>
        <Link className='btn text-light btn-outline-gavel fs-3 px-4' to="/register">Register now</Link> <br />
        <button className='btn btn-warning text-light fs-3 px-5 mt-2' onClick={getLocation}>Distress call</button> 

      </div>
    </div>
  )
}

export default Home;