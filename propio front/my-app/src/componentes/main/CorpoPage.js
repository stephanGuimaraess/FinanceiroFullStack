import React,{useEffect, useState} from 'react';
import './CorpoPage.css';
import Perfil from '../perfil/perfil';
import { useSelector, useDispatch } from "react-redux";
import {useForm} from 'react-hook-form';
import {Setdadosuser,setmessage} from '../../store/Reducers/Setvalues';




function CorpoMain(props) {

  const {register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [gastos, setgastos] = useState([]);
  const [total, settotal] =useState(0);
  const {idcliente} = useSelector(state=>state.Auth.profile[0])
  const {message} = useSelector(state=>state.Value);

  
  
 
  const dispatch = useDispatch();

  
  useEffect(() => {
    const totalformatado = gastos.reduce(
      (acc, gasto) => acc + parseFloat(gasto.valor), 0
    ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    settotal(totalformatado);
  }, [gastos]);
  

  useEffect(() => {
    if (message === 'Gastos adicionados ao banco de dados!') {
      alert('Gastos adicionados ao banco de dados!');
      dispatch(setmessage(null));
    }
    if(message === 'Erro ao adicionar gastos ao banco de dados!'){
      alert('Erro ao adicionar gastos ao banco de dados!');
      dispatch(setmessage(null));
    }
  }, [message]);
  
  
  function SendDadosToBd() {

    const gastosComId = gastos.map(gasto => ({
      ...gasto,
      idcliente: idcliente
    }));
      
      dispatch(Setdadosuser({gastos:gastosComId}));

                 
      setgastos([]);
      settotal(0);

       
  }

  const handlesubmit = data => {

  const valorFormatado = parseFloat(data.valor).toFixed(2);
  const novoGasto = { nome: data.nome, valor: valorFormatado };


  
    if (gastos.length >= 7) {
      alert("Você já criou o máximo de tabelas permitido.");
      return;
    }

    

    setgastos([...gastos, novoGasto]);

    
    reset()

    
    
  };

    const handleDelete = (index) => {
      const newGastos = [...gastos];
      newGastos.splice(index, 1);
      setgastos(newGastos);
    };
  
 
 
  return (
    

      <div>
          
      
      <div className="Container-main">
        <div className="row" id='rowajuste'>
            
            <Perfil 
            trocarcorrosa={props.trocarcorrosa}
            trocarcorblack={props.trocarcorblack}
            trocarcorroxo={props.trocarcorroxo}
            trocarcorcinza={props.trocarcorcinza}
            mantercor={props.mantercor}
            />
          
          <div className="col-md-3 ">


          <form onSubmit={handleSubmit(handlesubmit)}>


            <div className="container-fluid d-grid gap-2">
            
              <input
                type="text"
                className="ajustedoform"
                placeholder="Nome"
                maxLength={12}
                {...register('nome',{required: true})}
                               
              ></input>
              
            </div>
            
            <div className="container-fluid d-grid gap-2">
           
            <input
                type='number'
                className="ajustedoform"
                placeholder="Valor"
                step="0.01"          
                {...register('valor', { required: true})}
                                
              />
              
            </div>
            

            <div className="container-fluid d-grid gap-2">

              <button type="submit" className="btn btn-secondary " disabled={isSubmitting}>
                Submit
              </button>
            </div>

            </form>

          </div>
          
          <div className="col-md-5">
            <div className="row" id='colunarow'>
              <div className="col">
                <div className="card-header">
                  <h1>Gastos</h1>
                </div>
                <table className="table" id='tabela'>
                  <thead >
                    <tr>
                      <th className='th-corpo'>Nome</th>
                      <th className='th-corpo'>Valor</th>
                    </tr>
                  </thead>
                  <tbody className='reverse'>
                    
                        {gastos.map((gasto,index) => (
                        <tr key={index}>

                        <td className='td-corpo'>{gasto.nome}</td>
                        <td className='td-corpo'>{gasto.valor}</td>

                        <td>
                        <button className='btn btn-outline-danger btn-sm mybtn' id='mybtn' onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                        </tr>))}
                        
                       
                       
                    </tbody>
                    
                </table>
                
                <div className='ValorTotal'><span className='spanvalor'>valor total</span>
                <span className='spannumero'>{total}</span>
                
                </div>
                <div className='divdobutton'><button className='btn btn-success' onClick={SendDadosToBd}>Salvar</button></div>

              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
     
    );
  }

  export default CorpoMain;
