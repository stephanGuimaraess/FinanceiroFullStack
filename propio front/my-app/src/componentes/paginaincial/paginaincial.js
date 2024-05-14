import React from "react";
import Navbar from '../navbar/MenuSuperior'
import Footer from "../footer";
import CorpoMain from "../main/CorpoPage";
import Resumo from "../resumo/resumo";
import './paginainicial.css'
import { trocarcorrosa, trocarcorblack, trocarcorroxo, trocarcorcinza, mantercor } from '../../trocarcor';
import { useLocation } from 'react-router-dom';


function Paginainicial(){

    const location = useLocation();

    return(
        <div className="divpaipagina">

            <div className="divnavbar">
                <Navbar
                    trocarcorrosa={trocarcorrosa}
                    trocarcorblack={trocarcorblack}
                    trocarcorroxo={trocarcorroxo}
                    trocarcorcinza={trocarcorcinza}
                    mantercor={mantercor}
                />
            </div>

            <div className="divcorpo">
                {location.pathname === '/perfil-gerenciamento' ? (
                    <CorpoMain 
                        trocarcorrosa={trocarcorrosa}
                        trocarcorblack={trocarcorblack}
                        trocarcorroxo={trocarcorroxo}
                        trocarcorcinza={trocarcorcinza}
                        mantercor={mantercor}
                    />
                ) : (
                    <Resumo 
                        trocarcorrosa={trocarcorrosa}
                        trocarcorblack={trocarcorblack}
                        trocarcorroxo={trocarcorroxo}
                        trocarcorcinza={trocarcorcinza}
                        mantercor={mantercor}
                    />
                )}
            </div>

            <div className="divfooter">
                <Footer
                    trocarcorrosa={trocarcorrosa}
                    trocarcorblack={trocarcorblack}
                    trocarcorroxo={trocarcorroxo}
                    trocarcorcinza={trocarcorcinza}
                    mantercor={mantercor}
                />
            </div>  
        </div>
    )
}

export default Paginainicial;