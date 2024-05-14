import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Paginainicial from "../componentes/paginaincial/paginaincial";
import Login from '../componentes/Login/painellogin';
import Registro from "../componentes/registro/registro";
import PrivateRoute from './PrivateRota';
import Resumo from "../componentes/resumo/resumo";




function Rotas(){
    return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil-gerenciamento" element={<PrivateRoute><Paginainicial /></PrivateRoute>} />
      <Route path="/resumo" element={<PrivateRoute><Resumo/></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
)};

export default Rotas;