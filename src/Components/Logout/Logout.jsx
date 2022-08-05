import {React,useEffect} from 'react'
import { useNavigate  } from "react-router-dom";

export default function Logout() {
    let navigate = useNavigate();
    function handleLogOut() {
      localStorage.clear();
      navigate("/login");
    }
    useEffect(() => {
        handleLogOut()
      },[]);
}