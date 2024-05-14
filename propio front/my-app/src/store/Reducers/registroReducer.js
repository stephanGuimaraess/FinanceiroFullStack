import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import ConexaoApi from "../../services/registrosApi";



const initialState={
    username:'',
    salario:'',
    email:'',
    password:'',
    nascimento:'',
    confirmpassword:'',
    isLoading: false,
    isSuccess: false,
    isError: false,
    messageacerto: '',
    messageerro:null,
    
    
}


export const checkUser  = createAsyncThunk(
    'registro/checkuser',
  async (userData, { rejectWithValue }) => {
        
    try {
      
      const response = await ConexaoApi.checkUserAPI(userData);
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
    


const RegistroSlice = createSlice({
    name:"Registro",
    initialState,
    reducers: {

       
        setmessageerro(state,action){

          state.messageerro = action.payload;

    },

        setisSuccess(state,action){

          state.isSuccess = action.payload;
        },

       
  },

    extraReducers: builder => {
        builder
          .addCase(checkUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(checkUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.messageacerto = action.payload.message;
            
          })
          .addCase(checkUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            if(action.payload.status === 422){

              state.messageerro = action.payload.data.message;
              

            }else{

            state.messageerro = action.payload;

            }       
          });
      }

})



export const {setmessageerro,setisSuccess} = RegistroSlice.actions;

export default RegistroSlice.reducer;