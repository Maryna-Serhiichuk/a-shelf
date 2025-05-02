import { combineReducers } from '@reduxjs/toolkit';
import { productApi } from '@/api/product';

const rootReducer = combineReducers({
    [productApi.reducerPath]: productApi.reducer
});
export default rootReducer;