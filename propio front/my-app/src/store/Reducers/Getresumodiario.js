import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ConexaoApi from "../../services/registrosApi";

const initialState ={

  DiarioUser:[],
  message:null,
  
};



export const GetResumodiario = createAsyncThunk(
    'resumodiario/getdadosresumodiario',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await ConexaoApi.Getresumodiario(userData);
            return response;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Se o campo 'error' estiver presente na resposta, retorna ele na chamada rejectWithValue
                return rejectWithValue(error.response.data.error);
            } else {
                // Se não houver campo 'error', retorna a mensagem de erro padrão
                return rejectWithValue(error.message);
            }
        }
    }
);

const GetResumodiarioSlice = createSlice({

    name:"GetResumodiario",
    initialState,
    reducers: {
             
          setmessage:(state, action)=>{
            state.message = action.payload;
          }     
      },

      extraReducers: builder => {
        builder
          .addCase(GetResumodiario.fulfilled, (state, action) => {
            
             
              state.DiarioUser=action.payload;
              
               
          }
          
          )
          .addCase(GetResumodiario.rejected, (state, action) => {
            
            state.message = action.payload;
            
            

            }       
          )
          .addDefaultCase((state, action) => {
            
            return state;
          });
    },
    
  });


export const {setmessage} = GetResumodiarioSlice.actions;

export default GetResumodiarioSlice.reducer;