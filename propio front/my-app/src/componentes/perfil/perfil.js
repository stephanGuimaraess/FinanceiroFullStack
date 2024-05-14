import React, { useEffect,useState } from "react";
import './perfil.css';
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { Setimagem } from "../../store/Reducers/Setimg";
import axios from "axios";



export default function Perfil(props){

 
  const inputRef = useRef(null);

    
    const {nome,salario,nascimento} = useSelector(state=>state.Auth.profile[0]);
    const birthDate = new Date(nascimento);
    const formattedDate = birthDate.toLocaleDateString('pt-BR');
    const {idcliente} = useSelector(state=>state.Auth.profile[0]) 
    const [imagem, setImagem] = useState(null);
    
           

    const handleFileUpload = async (event) => {
     
      const file =event.target.files[0];
      const formData = new FormData();

      formData.append('file',file);
      formData.append('idcliente',idcliente);
      
      try{

        const res = await axios.post('http://localhost:5000/upload', formData, {
          headers:{
            'Content-Type':'multipart/form-data'
          }

        });

        
      } 
      
            
      catch(err){
          if(err.response.status === 500){
            console.log('houve um problema no servidor')
          }else{
            console.log(err.response.data.message);
          }
      }

     
      
    };

    useEffect(() => {
      fetch(`http://localhost:5000/images/${idcliente}`)
        .then(response => response.status === 404 ? setImagem(null) : response.blob())
        .then(blob => setImagem(URL.createObjectURL(blob)))
        
        .catch(error => {
          console.error(error);
         
        });
    }, [idcliente,imagem]);
    
    

    useEffect(() => {
     
      props.mantercor();
    }, []);
    
        return(

            <div className="col-md-4 div-perfil" id="container-img">
            
            <div className="perfil-interno">
            
            <div className="div-imagemperfil">
            <label htmlFor="imagem-perfil">

                <button type="button" className="btn btn-outline-info botaoimagem" 
                onClick={() => inputRef.current.click()}
                style={{ display: imagem ? "none" : "block" }}
                >imagem</button>

            </label>

            <input
                type="file"
                id="imagem-perfil"
                accept="image/*"
                onChange={handleFileUpload}
                style={{display: 'none'}}
                ref={inputRef}
            />

            {imagem ? (
            <div className="imagem-perfil-wrapper">
              <img src={imagem} className="img-fluid mx-auto p-2" id="img-corpo" alt="Imagem do perfil" />
              <div className="trocar-imagem-overlay">
                <label htmlFor="imagem-perfil" className="trocar-imagem-label">Trocar imagem</label>
                <input
                  type="file"
                  id="imagem-perfil"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{display: 'none'}}
                  ref={inputRef}
                />
              </div>
            </div>) : null
            }
            </div>


            
            <h1 className="text-center colorh1 editcolor editcolorname">{nome}</h1>
            <h5 className="text-center colorh5 editcolor">{formattedDate}</h5>
            <p className="text-center p-container editcolor">total ganho mensal : {salario}</p>
            <div className='divcolors'>
            <div className='colors color1' onClick={props.trocarcorrosa}></div>
            <div className='colors color2' onClick={props.trocarcorblack}></div>
            <div className='colors color3' onClick={props.trocarcorroxo}></div>
            <div className='colors color4' onClick={props.trocarcorcinza}></div>
            </div>
          </div>
        </div>

            
        )


    }


