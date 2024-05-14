import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}){

    const { isSuccess } = useSelector(state => state.Auth);
  
    return(

        isSuccess ? children : <Navigate to="/"/>
        
        )
  };

 export default PrivateRoute;