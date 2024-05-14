import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Reducers/CheckLogin';
import ValueSlice from './Reducers/Setvalues';
import GetSlice from './Reducers/GetValuess';
import RegistroSlice from './Reducers/registroReducer';
import GetResumoSlice from './Reducers/GetResumoTotal';
import GetResumodiarioSlice from './Reducers/Getresumodiario';
import ImagemSlice from './Reducers/Setimg';
import storage from 'redux-persist/lib/storage';
import {persistReducer,
    FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig = {
    key:'root',
    version: 1,
    storage,
    blacklist: ['Registro'],
    
};

const reducer = combineReducers({
    Auth:AuthSlice,
    Value:ValueSlice,
    Registro:RegistroSlice,
    GetGastos:GetSlice,
    GetResumoTotal:GetResumoSlice,
    Getresumodiario:GetResumodiarioSlice,
    // Img:ImagemSlice,

});

const persistedReducer = persistReducer(persistConfig,reducer);


const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
});

export default store;