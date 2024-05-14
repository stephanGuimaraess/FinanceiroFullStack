import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ConexaoApi from "../../services/registrosApi";

const initialState ={

  TotalUser:[],
  message:null,
  
};



export const GetResumototal = createAsyncThunk(
    'resumototal/getdadosresumo',
    async(userData, {rejectWithValue}) =>{
        
      try{

        const response = await ConexaoApi.Getresumo(userData);
        return response;

      }catch(error){
        return rejectWithValue(error.message);
      }

    }

)

const GetResumoSlice = createSlice({

    name:"GetResumoTotal",
    initialState,
    reducers: {
             
          // setmessage:(state, action)=>{
          //   state.message = action.payload;
          // }     
      },

      extraReducers: builder => {
        builder
          .addCase(GetResumototal.fulfilled, (state, action) => {
            
             
              state.TotalUser=action.payload;
              
               
          }
          
          )
          .addCase(GetResumototal.rejected, (state, action) => {
            
            state.message = action.payload.message;
            

            }       
          )
          .addDefaultCase((state, action) => {
            
            return state;
          });
    },
    
  });


export const {} = GetResumoSlice.actions;

export default GetResumoSlice.reducer;