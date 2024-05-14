import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ConexaoApi from "../../services/registrosApi";

const initialState ={

  message:null,
  
};



export const Setdadosuser = createAsyncThunk(
    'resumodosdados/setdados',
    async(userData, {rejectWithValue}) =>{
        
      try{

        const response = await ConexaoApi.SetDadosUser(userData);
        return response;

      }catch(error){
        return rejectWithValue(error.message);
      }

    }

)

const ValueSlice = createSlice({

    name:"Value",
    initialState,
    reducers: {
             
          setmessage:(state, action)=>{
            state.message = action.payload;
          }     
      },

      extraReducers: builder => {
        builder
          .addCase(Setdadosuser.fulfilled, (state, action) => {
            
             
              state.message=action.payload.message;
              
               
          }
          
          )
          .addCase(Setdadosuser.rejected, (state, action) => {
            
            state.message = action.payload.message;
            

            }       
          )
          .addDefaultCase((state, action) => {
            
            return state;
          });
    },
    
  });


export const {setmessage} = ValueSlice.actions;

export default ValueSlice.reducer;