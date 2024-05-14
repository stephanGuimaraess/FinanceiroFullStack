import axios from "axios";

const ConexaoApi ={


checkUserAPI: async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/register',userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
},

CheckLoginApi:async(userdata) =>{

  try {
    const response = await axios.post('http://localhost:5000/login',userdata);
    return response.data;
  }catch(error){
    throw new Error(error.response.data.message);
  }
},

SetDadosUser:async(userData) =>{

  try{
    const response = await axios.post('http://localhost:5000/resumo',userData);
    return response.data;
    
  }catch(error){

    throw new Error(error.response.data.message);
  }
  
},

GetDadosUser:async(userData) =>{

  try{
    const response = await axios.post('http://localhost:5000/getresumo',userData);
    return response.data;
    
  }catch(error){

    throw new Error(error.response.data.message);
  }
  
},
Getresumo:async(userData) =>{

  try{
    const response = await axios.post('http://localhost:5000/getresumototal',userData);
    return response.data;
    
  }catch(error){

    throw new Error(error.response.data.message);
  }
  
},

Getresumodiario:async(userData) =>{

  try{
    const response = await axios.post('http://localhost:5000/getresumodiario',userData);
    return response.data;
    
  }catch(error){

    throw new Error(error.response.data.message);
  }
  
},

// SetImagemUser:async(userData) =>{

//   try{
//     const response = await axios.post('http://localhost:5000/Setimagem',userData);
//     return response.data;
    
//   }catch(error){

//     throw new Error(error.response.data.message);
//   }
  
// }
}

export default ConexaoApi;