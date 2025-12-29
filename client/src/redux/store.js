import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice"
import { adminApi } from "./api/adminApi";
import { ownerApi } from "./api/ownerApi";
import { rentalApi } from "./api/rentalApi";
import { customerApi } from "./api/customerApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [ownerApi.reducerPath]: ownerApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [rentalApi.reducerPath]: rentalApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        auth:authSlice
    },
    middleware:(def)=>[...def(),authApi.middleware,adminApi.middleware,ownerApi.middleware,rentalApi.middleware,customerApi.middleware]
})

export default reduxStore