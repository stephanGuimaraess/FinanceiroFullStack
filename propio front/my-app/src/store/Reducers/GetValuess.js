import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ConexaoApi from "../../services/registrosApi";

const initialState ={

  ValuesUser:[{datahora
    : 
    "2023-04-28T12:49:22.000Z",
    nomeproduto
    : 
    "0",
    valor_total
    : 
    "00.00",
    valorproduto
    : 
    "0.00"}],
  message:null,
  
};



export const Getdadosuser = createAsyncThunk(
    'resumodosdados/getdados',
    async(userData, {rejectWithValue}) =>{
        
      try{

        const response = await ConexaoApi.GetDadosUser(userData);
        return response;

      }catch(error){
        return rejectWithValue(error.message);
      }

    }

)

const GetSlice = createSlice({

    name:"GetGastos",
    initialState,
    reducers: {
             
          // setmessage:(state, action)=>{
          //   state.message = action.payload;
          // }     
      },

      extraReducers: builder => {
        builder
          .addCase(Getdadosuser.fulfilled, (state, action) => {
            
             
              state.ValuesUser=action.payload;
              
               
          }
          
          )
          .addCase(Getdadosuser.rejected, (state, action) => {
            
            state.message = action.payload.message;
            

            }       
          )
          .addDefaultCase((state, action) => {
            
            return state;
          });
    },
    
  });


export const {} = GetSlice.actions;

export default GetSlice.reducer;