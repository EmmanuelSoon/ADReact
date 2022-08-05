import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const userToken = localStorage.getItem('userId');
        return userToken?.token
      };

  const [token, setToken] = useState();

  
  const saveToken = id => {
    localStorage.setItem('userId',id);
    setToken(id);
  };

  return {
    setToken: saveToken,
    token
  }
}