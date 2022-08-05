import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export default function LoginWithData() {
    // //check if the username and password from parameters
    // const {username, password} = useParams()
    // let navigate = useNavigate();
    // useEffect(() => {
    //     //clear first
    //     localStorage.clear();
    //     userInput = {
    //         username:username,
    //         password:password
    //     }

    //     fetch('/login', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(userInput)
    //       })
    //       .then(res => res.json())
    //       .then(
    //         data => {
    //             if (data) {
    //                 localStorage.setItem('user', data)
    //                 navigate("/recipes", { replace: true });
    //             }
    //             else {
    //                 //bring user to login page
    //                 //let them manually input the username and password
    //                 navigate("/login", { replace: true });
    //             }
    //         }
    //     )
    //   }, []);

  return (
    <div>Loading...</div>
  )
}
