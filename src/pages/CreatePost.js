import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [error, setError] = useState(false);
    // const [posts, setPosts] = useState([]);
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
            // navigate("/dashboard");
        } else if(res.data.userType == "Lawyer") {
            setUser(res.data.userDetails);
            navigate("/attorney");
        }
        }
    })
    }, []);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const createPost = () => {
      axios.post("https://gavel-server.onrender.com/post", {email: user.email, title, body}).then((res) => {
        if(res.data.status == false) {
          setError(res.data.message);
        } else {
          navigate("/dashboard");
        }
      })
    }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="container col-6">
            <h4 className="text-center display-4">Create Post</h4>
            {error && <div className="text-center alert alert-danger text-danger">{error}</div>}
            <input placeholder="Title" className="w-100 form-control my-2" onChange={(e) => setTitle(e.target.value)} value={title} />
            <textarea placeholder="Body" rows="3" className="w-100 form-control my-2" onChange={(e) => setBody(e.target.value)} value={body} />
            <p className="text-center"><button className="btn btn-gavel" onClick={createPost}>Create Post</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost;