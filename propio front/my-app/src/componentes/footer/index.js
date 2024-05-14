import React,{useEffect} from "react";
import './footer.css';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer(props){

    useEffect(() => {
        props.mantercor();
      }, []);
    
    
    return(
   

    <div id="footerpai">
    <p className="pfootter1">Stephan Guimarães</p>

            <div className="footerfilho">
             <p className="pfootter2">redes sociais:
           </p>
           <a className="linksredsocial" href="https://www.facebook.com/stephanguimaraess"><FaFacebook size={20} color="#3b5998" /></a>
            <a className="linksredsocial" href="https://www.instagram.com/stephanguimaraess"><FaInstagram size={20} color="#E1306C" /></a>
            <a className="linksredsocial" href="https://github.com/StephanGuimaraes"><FaGithub size={20} color="#3b5998" /></a>
            <a className="linksredsocial" href="https://www.linkedin.com/in/stephan-guimar%C3%A3es-93a708203/"><FaLinkedin size={20} color="#E1306C" /></a>
            </div>
    </div>

   
    )
}
