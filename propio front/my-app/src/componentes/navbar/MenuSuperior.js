import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './MenuSuperior.css';
import { createBrowserHistory } from 'history';
import {useDispatch} from 'react-redux';



function MenuSuperior(props){

  const dispatch = useDispatch();

  
  
  function handleSair() {
    const history = createBrowserHistory();
      
      localStorage.clear();
      history.push("/");
      window.location.reload();
  }
   
  useEffect(() => {
     
    props.mantercor();
  }, []);
   
  return (
    
    <div >
      
       <nav className="navbar navbar-expand-lg navbar-dark " id="navtrocacor">
      <Link to="/perfil-gerenciamento" className="navbar-brand letrastrocacor" id="LinkGe">Gerenciamento</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">

        <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse"  id="navbarTogglerDemo01">
          <ul className="navbar-nav" id="Links-nav">
            <li className="nav-item">
              <Link to="/resumo" className="nav-link letrastrocacor resumoedit">Resumo</Link>
            </li>
            <li className="nav-item">
              
            </li>
          </ul>
          <div onClick={handleSair} className="logoutTopo"><ion-icon name="log-out-outline"></ion-icon></div>
        </div>
      </nav>
    </div>
  );
    
}

export default MenuSuperior;