import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const Dashboard = () => {
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const urls = "";
    useEffect(() => {
        document.title = "Gavel || Dashboard";
    })
    const [user, setUser] = useState("")
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
            setUser(res.data.userDetails);
            const urls = "https://gavel-server.onrender.com/post/all";
            axios.get(urls).then((res) => {
                if(res.data.status == false) {
                setError(res.data.message);
                } else {
                    console.log(res.data)
                setPosts(res.data);
                }
            }).catch((err) => {
                setError(err.message);
            })
            // navigate("/dashboard");
        } else if(res.data.userType == "Lawyer") {
            setUser(res.data.userDetails);
            navigate("/attorney");
        }
        }
    })
    }, []);
    // console.log(user)
  return (
    <div>
        <h4 className="text-center display-4">{user.first_name} {user.last_name}</h4>
        <p className="text-center">{user.email}</p>
        <p className="text-center"> <Link to="/create-post" className="btn btn-dark" >Create Post</Link> </p>
        <div>
                {error && <div className="text-center alert alert-danger text-danger">{error}</div> }
                <div className='d-flex justify-content-center mx-auto col-lg-6 col-12 col-sm-12 col-md-7'>
                    <div className="">
                        {posts.map((val, i) => (
                    <Post key={i} post={val} />
                    ))}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Dashboard;