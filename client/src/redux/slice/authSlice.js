import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice= createSlice({
    name: "authSlice",
    initialState: {
        admin:JSON.parse(localStorage.getItem("admin")),
        customer:JSON.parse(localStorage.getItem("customer")),
        owner:JSON.parse(localStorage.getItem("owner")),
        rental:JSON.parse(localStorage.getItem("rental"))
    },
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },  
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.logoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        
        .addMatcher(authApi.endpoints.verifyCustomer.matchFulfilled, (state, { payload }) => {
            state.customer = payload
        })
        .addMatcher(authApi.endpoints.logoutCustomer.matchFulfilled, (state, { payload }) => {
            state.customer = null
        })
        
        .addMatcher(authApi.endpoints.Oauth.matchFulfilled, (state, { payload }) => {
            state.owner = payload
        })
        .addMatcher(authApi.endpoints.logoutOwner.matchFulfilled, (state, { payload }) => {
            state.owner = null
        })

        .addMatcher(authApi.endpoints.loginRental.matchFulfilled, (state, { payload }) => {
            state.rental = payload
        })
        .addMatcher(authApi.endpoints.logoutRental.matchFulfilled, (state, { payload }) => {
            state.rental = null
        })
        
       
})

export const { invalidate } = authSlice.actions
export default authSlice.reducer