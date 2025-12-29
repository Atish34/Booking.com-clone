import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const rentalApi = createApi({
    reducerPath: "rentalApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/rental`,
       credentials: "include"
    }),
    tagTypes: ["rental"],
    endpoints: (builder) => {
        return {
            addRentalVehicle: builder.mutation({
                query: rentalData => {
                    return {
                        url: "/rental-vehicle-add",
                        method: "POST",
                        body: rentalData
                    }
                },
                invalidatesTags: ["rental"]
            }),
              getRentalVehicle: builder.query({
                query: (rentalId) => {
                    return {
                        url: `/rental-vehicle-get/${rentalId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["rental"]
            }),
            updateRentalProperty: builder.mutation({
                query: rentalData => {
                    return {
                        url: "/rental-vehicle-update/" + rentalData.id,
                        method: "PUT",
                        body:rentalData
                    }
                },
                invalidatesTags: ["rental"]
            }),
            deleteRentalProperty: builder.mutation({
                query: _id => {
                    return {
                        url: "/rental-vehicle-delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["rental"]
            }),
             getRentalVehicleBook: builder.query({
                query: (rentalId) => {
                    return {
                        url: `/rental-vehicle-get-book/${rentalId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["rental"]
            }),
             updateRentalBook: builder.mutation({
                query: rentalData => {
                    return {
                        url: "/update-rental-vehicle-book/" + rentalData.id,
                        method: "PUT",
                        body:rentalData
                    }
                },
                invalidatesTags: ["rental"]
            }),
            deleteRentalBook: builder.mutation({
                query: _id => {
                    return {
                        url: "/delete-rental-vehicle-book/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["rental"]
            }),
             updateRentalAmount: builder.mutation({
                query: rentalData => {
                    return {
                        url: "/update-rental-amount/" + rentalData.id,
                        method: "PUT",
                        body:rentalData
                    }
                },
                invalidatesTags: ["rental"]
            }),
           
        
        }
    }
})

export const { useAddRentalVehicleMutation,useGetRentalVehicleQuery,useDeleteRentalPropertyMutation,useUpdateRentalPropertyMutation,useGetRentalVehicleBookQuery,useDeleteRentalBookMutation,useUpdateRentalBookMutation,useUpdateRentalAmountMutation } = rentalApi
