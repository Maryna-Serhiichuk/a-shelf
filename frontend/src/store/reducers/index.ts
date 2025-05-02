import { baseApi } from '@/api';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});
export default rootReducer;