import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        credentials: "include"
     }),
    endpoints: (builder) => {
        return {
            loginAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.setItem("admin",JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.removeItem("admin")
                    return data
                }
            }),
            registerCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer/register",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            loginCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer/login",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            verifyCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer/verifyOtp",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.setItem("customer",JSON.stringify(data.result))
                    return data.result
                }
            }),
             logoutCustomer: builder.mutation({
                query: userData => {
                    return {
                        url: "/customer/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.removeItem("customer")
                    return data
                }
            }),
            Oauth: builder.mutation({
                query: userData => {
                    return {
                        url: "/continuewithgoogle",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.setItem("owner",JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutOwner: builder.mutation({
                query: userData => {
                    return {
                        url: "/ownerlogout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.removeItem("owner")
                    return data
                }
            }),
             registerRental: builder.mutation({
                query: userData => {
                    return {
                        url: "/rental/register",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            loginRental: builder.mutation({
                query: userData => {
                    return {
                        url: "/rental/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.setItem("rental",JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutRental: builder.mutation({
                query: userData => {
                    return {
                        url: "/rental/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data)=>{
                    localStorage.removeItem("rental")
                    return data
                }
            }),
        
        }
    }
})

export const {useLoginAdminMutation,useLogoutAdminMutation,useLoginCustomerMutation,useLogoutCustomerMutation,useRegisterCustomerMutation,useVerifyCustomerMutation,useOauthMutation,useLogoutOwnerMutation,useLoginRentalMutation,useRegisterRentalMutation,useLogoutRentalMutation} = authApi
