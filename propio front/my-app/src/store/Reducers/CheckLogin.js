import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  ConexaoApi  from "../../services/registrosApi";



const initialState =
{
    profile:null,
    isLoading: false,
    isSuccess:false,
    error: false,
    mensagem:null,
    }

  

export const CheckLogin = createAsyncThunk(
    'login/verificausuario',
    async(userdata, {rejectWithValue})=>{

      try{
        const response = await ConexaoApi.CheckLoginApi(userdata);
        return response;
      }catch(error){
        return rejectWithValue(error.message);
      }
    }
)


const AuthSlice = createSlice({

    name:"Auth",
    initialState,
    reducers: {
       
        setMensagem(state,action){
          state.mensagem= action.payload;
          
        },

        setProfile(state,action){
          state.profile = action.payload;
        }
                

      },
      extraReducers: builder => {
        builder
          .addCase(CheckLogin.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(CheckLogin.fulfilled, (state, action) => {
            
            state.isLoading = false;
            state.isSuccess = true;
            state.mensagem = action.payload.message;
            state.profile = action.payload.results;
            
          })
          .addCase(CheckLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.mensagem = action.payload;
          })
          .addDefaultCase((state, action) => {
            
            return state;
          });
      }
    });

     

export const {setLoading, setError, setLogado,setMensagem,setProfile } = AuthSlice.actions;


export default AuthSlice.reducer;

  