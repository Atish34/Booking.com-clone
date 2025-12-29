import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ownerApi = createApi({
    reducerPath: "ownerApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/owner`,
       credentials: "include"
    }),
    tagTypes: ["owner"],
    endpoints: (builder) => {
        return {
            addOwnerProperty: builder.mutation({
                query: ownerData => {
                    return {
                        url: "/owner-property-add",
                        method: "POST",
                        body: ownerData
                    }
                },
                invalidatesTags: ["owner"]
            }),
            getOwnerProperty: builder.query({
                query: (ownerId) => {
                    return {
                        url: `/owner-property-get/${ownerId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["owner"]
            }),
            updateOwnerProperty: builder.mutation({
                query: ({id,formData}) => {
                    return {
                        url: `/owner-property-update/${id}`,
                        method: "PUT",
                        body: formData
                    }
                },
                invalidatesTags: ["owner"]
            }),
            deleteOwnerProperty: builder.mutation({
                query: _id => {
                    return {
                        url: "/owner-property-delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["owner"]
            }),
             addOwnerRoom: builder.mutation({
                query: ownerData => {
                    return {
                        url: "/add-owner-room",
                        method: "POST",
                        body: ownerData
                    }
                },
                invalidatesTags: ["owner"]
            }),
            deleteOwnerRoom: builder.mutation({
              query: ({ propertyId, roomId }) => ({
                url: `/room/${propertyId}/${roomId}`,
                method: "DELETE",
              }),
              invalidatesTags: ["owner"],
            }),
            getOwnerHotelBook: builder.query({
                query: (ownerId) => {
                    return {
                        url: `/owner-hotel-get-book/${ownerId}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["owner"]
            }),
              ownerChangeStatus: builder.mutation({
                query: ownerData => {
                    return {
                        url: "/owner-change-status/" + ownerData.id,
                        method: "PUT",
                        body: ownerData
                    }
                },
                invalidatesTags: ["owner"]
            }),
             deleteHotelBook: builder.mutation({
                query: _id => {
                    return {
                        url: "/owner-hotel-delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["owner"]
            }),
            
        
        }
    }
})

export const { useAddOwnerPropertyMutation,useGetOwnerPropertyQuery,useDeleteOwnerPropertyMutation,useUpdateOwnerPropertyMutation,useAddOwnerRoomMutation,useDeleteOwnerRoomMutation,useGetOwnerHotelBookQuery,useOwnerChangeStatusMutation,useDeleteHotelBookMutation } = ownerApi
