import React from "react";
import { useEffect} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { mantercor } from '../../trocarcor';
import './resumo.css';
import {useForm} from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { Getdadosuser } from "../../store/Reducers/GetValuess";
import moment from 'moment';
import{ useRef } from "react";
import { GetResumototal } from "../../store/Reducers/GetResumoTotal";
import { GetResumodiario } from "../../store/Reducers/Getresumodiario";
import { setmessage } from "../../store/Reducers/Getresumodiario";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';


function Resumo(){

    const dispatch = useDispatch();
    const dateInputRef = useRef();
    const {register, handleSubmit} = useForm();

    const [filterddata, setFilterData] = useState([]);
        
    const [numpage, setNumPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);    
    const {ValuesUser} = useSelector(state =>state.GetGastos);
    const {TotalUser} = useSelector(state =>state.GetResumoTotal);
    const {DiarioUser,message} = useSelector(state =>state.Getresumodiario);
    const {produtos,totaldiario,datahora} = DiarioUser;
    const {idcliente} = useSelector(state=>state.Auth.profile[0])
    const pageSize = 8;
    
    

    const datahoranew = new Date(datahora);
    const dia = datahoranew.getDate().toString().padStart(2, '0');
    const mes = (datahoranew.getMonth() + 1).toString().padStart(2, '0');
    const ano = datahoranew.getFullYear().toString();
    const hora = datahoranew.getHours().toString().padStart(2, '0');
    const minuto = datahoranew.getMinutes().toString().padStart(2, '0');
    const segundo = datahoranew.getSeconds().toString().padStart(2, '0');
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
   
    


    const currentDate = moment();
    const threeMonthsAgo = moment().subtract(3, 'months');      
    

        const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        };



        const getPaginatedTableRows = (tableRows, pageSize, currentPage) => {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            
            return tableRows.slice(startIndex, endIndex);
          };


          useEffect(()=>{

            if(message){
              alert(message);
              dispatch(setmessage(null));
            }

          },[message]);


          
          useEffect(() => {
     
            if(produtos){
              
              setFilterData(produtos);
              const numPages = Math.ceil(filterddata.length / pageSize);  
              setNumPages(numPages);
              setCurrentPage(1);
             
            }
          }, [produtos,filterddata]);
         
          

    useEffect(() => {
     
        mantercor();
      }, []);

      useEffect(() => {

        dispatch(Getdadosuser({idcliente}));
        
        
      }, [idcliente]);

      useEffect(() => {

        dispatch(GetResumototal({start: threeMonthsAgo.format('YYYY-MM-DD'),
        end: currentDate.format('YYYY-MM-DD'),idcliente:idcliente}));
        
      }, [idcliente]);



function handleSair() {
        const history = createBrowserHistory();
          
          localStorage.clear();
          history.push("/");
          window.location.reload();
 }



function SolicitarCalendario(data){

  const datacalendario = data.calendario;
  const dataSelecionada = moment(datacalendario, 'YYYY-MM-DD');
   


  dispatch(GetResumodiario({diario:dataSelecionada, idcliente:idcliente}))

  
  
   
  
}


const data = TotalUser.map(item => item.mes);
const total = TotalUser.map(item => item.total);

data.sort((a, b) => new Date(a.mes) - new Date(b.mes));

const dadosOrdenados = data.map((item, index) => {
  return { mes: item, total: total[index] };
});
dadosOrdenados.sort((a, b) => new Date(a.mes) - new Date(b.mes));
    return(
    
    <div className="divpaipagina">
        <div className="divnavbar">
      
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
       
   <div className="divcorpo row">

            <div className="corpodocalendario col-md-3">

            
            <form onSubmit={handleSubmit(SolicitarCalendario)}>

            <div className="container-fluid d-grid gap-2">

            <input {...register('calendario',{required:true})} id="date" type="date"/>

                <button type="submit" className="btn btn-info">Solicitar</button>

            </div>
            </form>                       

            </div>
            <div className="col-md-8 divtabeladados">

              <table className="table table-info table-container">
              <thead>
                  <tr>
                     {dadosOrdenados.map((month, index) => (
                <th key={index}>{month.mes}</th>
              ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  {dadosOrdenados.map((month, index) => (
                <td key={index}>{month.total}</td>
              ))}
                  </tr>
                </tbody>
              </table>
            
            <table className="table table-info table-container">
                    
                    <thead>
                    
                        <tr>
                        <th scope="col">Gastos</th>
                        <th scope="col">Data</th>
                        <th scope="col">Total</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {getPaginatedTableRows(filterddata, pageSize, currentPage).map((row, index) => (
                      <tr key={index}>
                        <td >{`${row.nomeproduto} - R$${row.valorproduto}`}</td>
                        <td >{dataFormatada}</td>
                        <td >{totaldiario}</td>
                      </tr>
                    ))}                      
                   
                    </tbody>

                    
                    </table>
                    <div className="d-flex ">
                    { numpage > 1 && Array.from({ length: numpage }, (_, index) => index + 1).map((pageNumber) => (
                        <button key={pageNumber} className="btn btn-primary btn-sm botaotabelapass" onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber}
                        </button>
                    ))}
                    </div>
                    
            </div>


   </div>



   <div className="divfooter">

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

   </div>
    </div>
    
    )
}

export default Resumo;