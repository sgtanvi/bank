import React, {useState} from "react";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
  function getToken(){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }
  
  const useToken = () => {
    const getToken =() => {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString)
      return userToken?.token
    }
  
    const [token, setToken] = useState(getToken())
    const saveToken = userToken => {
      sessionStorage.setItem('token', JSON.stringify(userToken))
      setToken(userToken.token)
    }
    return{
      setToken: saveToken,
      token
    }
  }
  
  export default useToken;