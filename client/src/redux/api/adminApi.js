import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
        credentials:"include" 
    }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            adminGetCustomer: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-customer",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            adminBlockUnblockCustomer: builder.mutation({
                query: customerData => {
                    return {
                        url: "/update-admin-customer/" + customerData._id,
                        method: "PUT",
                        body: customerData
                    }
                },
                providesTags: ["admin"]
            }),
            adminGetOwner: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-owner",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            adminBlockUnblockOwner: builder.mutation({
                query: ownerData => {
                    return {
                        url: "/update-admin-owner/" + ownerData._id,
                        method: "PUT",
                        body: ownerData
                    }
                },
                providesTags: ["admin"]
            }),
            adminGetProperty: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-property",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            adminBlockUnblockProperty: builder.mutation({
                query: propertyData => {
                    return {
                        url: "/update-admin-property/" + propertyData._id,
                        method: "PUT",
                        body: propertyData
                    }
                },
                providesTags: ["admin"]
            }),
            adminGetVehicle: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-vehicle",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            adminBlockUnblockVehicle: builder.mutation({
                query: vehicleData => {
                    return {
                        url: "/update-admin-vehicle/" + vehicleData._id,
                        method: "PUT",
                        body: vehicleData
                    }
                },
                providesTags: ["admin"]
            }),
            adminGetRental: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-rental",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            adminBlockUnblockRental: builder.mutation({
                query: rentalData => {
                    return {
                        url: "/update-admin-rental/" + rentalData._id,
                        method: "PUT",
                        body: rentalData
                    }
                },
                providesTags: ["admin"]
            }),
             addAdminAirplane: builder.mutation({
                query: adminData => {
                    return {
                        url: "/add-admin-airplane",
                        method: "POST",
                        body: adminData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            adminGetAirplane: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-airplane",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
             updateAdminAirplane: builder.mutation({
                query: adminData => {
                    return {
                        url: "/update-admin-airplane/" + adminData.id,
                        method: "PUT",
                        body:adminData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteAdminAirplane: builder.mutation({
                query: _id => {
                    return {
                        url: "/delete-admin-airplane/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),
            adminGetAirplaneBook: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-airplane-book",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
             updateAdminAirplaneBook: builder.mutation({
                query: adminData => {
                    return {
                        url: "/update-admin-airplane-book/" + adminData.id,
                        method: "PUT",
                        body:adminData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteAdminAirplaneBook: builder.mutation({
                query: _id => {
                    return {
                        url: "/delete-admin-airplane-book/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),
             adminGetRentalBook: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-rental-book",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
             adminGetHotelBook: builder.query({
                query: () => {
                    return {
                        url: "/get-admin-hotel-book",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            
        }
    }
})

export const { useAdminGetCustomerQuery,useAdminBlockUnblockCustomerMutation,useAdminBlockUnblockOwnerMutation,useAdminGetOwnerQuery,useAdminGetPropertyQuery,useAdminBlockUnblockPropertyMutation,useAdminGetRentalQuery,useAdminBlockUnblockRentalMutation,useAdminBlockUnblockVehicleMutation,useAdminGetVehicleQuery,useAddAdminAirplaneMutation,useAdminGetAirplaneQuery,useDeleteAdminAirplaneMutation,useUpdateAdminAirplaneMutation,useAdminGetAirplaneBookQuery,useUpdateAdminAirplaneBookMutation,useDeleteAdminAirplaneBookMutation,useAdminGetRentalBookQuery,useAdminGetHotelBookQuery } 
= adminApi
