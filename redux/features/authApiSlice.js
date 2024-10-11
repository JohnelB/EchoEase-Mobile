import apiSlice from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/jwt/create/',
                method: 'POST',
                body: data,
            }) 
        }),
        getUser: builder.query({
            query: () => '/whoami',
            providesTags: ["CurrentUser"]
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url: `/profile/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ["CurrentUser"]
        })
    })
})

export const {useLoginMutation, useGetUserQuery, useUploadImageMutation} = authApiSlice;

export default authApiSlice;