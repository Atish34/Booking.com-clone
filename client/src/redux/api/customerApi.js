import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/customer`,
       credentials: "include"
    }),
    tagTypes: ["customer"],
    endpoints: (builder) => {
        return {
              getCustomerProperty: builder.query({
                query: () => {
                    return {
                        url: "/get-customer-property",
                        method: "GET",
                    }
                },
                invalidatesTags: ["customer"]
            }),
            searchCustomerProperty: builder.query({
              query: ({ destination, keyword, date }) => ({
                url: "/customer/stay/search",
                params:{ destination, keyword, date },
              }),
            }),

              getCustomerAirplane: builder.query({
                query: () => {
                    return {
                        url: "/get-customer-airplane",
                        method: "GET",
                    }
                },
                invalidatesTags: ["customer"]
            }),
             searchCustomerAirplane: builder.query({
              query: ({ destination, keyword, date,date2 }) => ({
                url: "/customer/airplane/search",
                params: { destination, keyword, date,date2 },
              }),
            }),

              getCustomerRental: builder.query({
                query: () => {
                    return {
                        url: "/get-customer-rental",
                        method: "GET",
                    }
                },
                invalidatesTags: ["customer"]
            }),

             addCustomerAirplaneBook: builder.mutation({
                query: customerData => {
                    return {
                        url: "/customer-airplane-book",
                        method: "POST",
                        body: customerData
                    }
                },
                invalidatesTags: ["customer"]
            }),
             getCustomerAirplaneBook: builder.query({
                query: (customerId) => {
                    return {
                        url: `/get-customer-airplane-book/${customerId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["customer"]
            }),
             customerCancelAirplaneBook: builder.mutation({
                query: customerData => {
                    return {
                        url: "/update-customer-airplane-book/" + customerData._id,
                        method: "PUT",
                        body: customerData
                    }
                },
                providesTags: ["customer"]
            }),
             addCustomerRentalBook: builder.mutation({
                query: customerData => {
                    return {
                        url: "/customer-rental-book",
                        method: "POST",
                        body: customerData
                    }
                },
                invalidatesTags: ["customer"]
            }),
            getCustomerRentalBook: builder.query({
                query: (customerId) => {
                    return {
                        url: `/get-customer-rental-book/${customerId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["customer"]
            }),
             customerCancelRentalBook: builder.mutation({
                query: customerData => {
                    return {
                        url: "/update-customer-rental-book/" + customerData._id,
                        method: "PUT",
                        body: customerData
                    }
                },
                providesTags: ["customer"]
            }),
             addCustomerHotelBook: builder.mutation({
                query: customerData => {
                    return {
                        url: "/customer-hotel-book",
                        method: "POST",
                        body: customerData
                    }
                },
                invalidatesTags: ["customer"]
            }),
            getCustomerHotelBook: builder.query({
                query: (customerId) => {
                    return {
                        url: `/get-customer-hotel-book/${customerId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["customer"]
            }),
             customerCancelHotelBook: builder.mutation({
                query: customerData => {
                    return {
                        url: "/update-customer-hotel-book/" + customerData._id,
                        method: "PUT",
                        body: customerData
                    }
                },
                providesTags: ["customer"]
            }),
            
        
        }
    }
})

export const { useGetCustomerAirplaneQuery,useGetCustomerPropertyQuery,useGetCustomerRentalQuery,useLazySearchCustomerPropertyQuery,useLazySearchCustomerAirplaneQuery,useAddCustomerAirplaneBookMutation,useGetCustomerAirplaneBookQuery,useCustomerCancelAirplaneBookMutation,useAddCustomerRentalBookMutation,useGetCustomerRentalBookQuery,useCustomerCancelRentalBookMutation,useAddCustomerHotelBookMutation,useGetCustomerHotelBookQuery,useCustomerCancelHotelBookMutation } = customerApi
