// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import ConexaoApi from "../../services/registrosApi";

// const initialState ={

//  message:null,
  
// };



// export const Setimagem = createAsyncThunk(
//     'imagemdados/setimagem',
//     async(userData, {rejectWithValue}) =>{
        
//       try{

//         const response = await ConexaoApi.SetImagemUser(userData);
//         return response;

//       }catch(error){
//         return rejectWithValue(error.message);
//       }

//     }

// )

// const ImagemSlice = createSlice({

//     name:"Img",
//     initialState,
//     reducers: {
             
//         //   setmessage:(state, action)=>{
//         //     state.message = action.payload;
//         //   }     
//       },

//       extraReducers: builder => {
//         builder
//           .addCase(Setimagem.fulfilled, (state, action) => {
            
             
//               state.message=action.payload.message;
              
               
//           }
          
//           )
//           .addCase(Setimagem.rejected, (state, action) => {
            
//             state.message = action.payload.message;
            

//             }       
//           )
//           .addDefaultCase((state, action) => {
            
//             return state;
//           });
//     },
    
//   });


// export const {} = ImagemSlice.actions;

// export default ImagemSlice.reducer;