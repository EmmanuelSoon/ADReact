import React, { useState ,useEffect} from "react";
import {useNavigate } from 'react-router-dom';
export default function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const handleSubmit = async e => {
        e.preventDefault();
        const userInput={
            username:username,
            password:password
        }
        console.log(userInput)
        fetch('/recipe/checkuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
          })
          .then(async (res) => {
                if(res.ok){
                    let data = await res.json()
                    setErrorMsg("")
                    setUserId(data.id)
                    // localStorage.setItem('user', JSON.stringify(data))
                    localStorage.setItem('userId', data.id)
                    //console.log("after", data.id)
                    //let data2 = JSON.parse(localStorage.getItem('user'))
                    console.log("getItem", localStorage.getItem('userId'))
                }
                else {
                    setErrorMsg("UserName And PassWord are not matching!")
                }
            })
    };
    useEffect(() => {
        const UserId = localStorage.getItem("userId");
        //console.log("e1", UserId)
        if (UserId) {
            console.log("Effect",UserId)
            setUserId(UserId);
        }
      },[]);

    if (userId) {
        //return <div>{userId} is loggged in</div>;
        navigate("/", { replace: true });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-muted mt-5"><strong>User Login Page</strong></h2>
                    <div className="card my-3">
                    <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit} method="post">
                        {/* <div className="text-center">
                        <img src={logo} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                            width="200px" alt="profile"/>
                        </div> */}
                        <div className="mb-3">
                            <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="User Name"/>            
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />            
                        </div>
                        <div>
                            <p className="text-danger"> {errorMsg} </p>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 w-100">Login</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

