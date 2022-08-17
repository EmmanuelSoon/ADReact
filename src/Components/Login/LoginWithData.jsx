import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function LoginWithData() {
    //check if the username and password from parameters
    const {id, userhash, passhash} = useParams()
    let navigate = useNavigate();
    useEffect(() => {
        //clear first
        localStorage.clear();
        let userInput = {
            userid: id,
            userhash:userhash,
            passhash:passhash
        }

        fetch('/recipe/android', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
          })
          .then(async res => {
            if(res.ok){
              let data = await res.json()
              localStorage.setItem('userId', data.id)
            }
            else{
              //bring user to login page
              //let them manually input the username and password
              navigate("/login", { replace: true });
            }
          })
        .then(navigate("/recipes", { replace: true }))
      }, []);

  return (
    <div>Loading...</div>
  )
}
