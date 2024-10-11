import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api', // Unique key for the API slice
  tagTypes: ["CurrentUser"],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.35:8000/api' }), 
  // Replace with your API base URL
  endpoints: (builder) => ({})
});

// Export hooks for usage in functional components
export const {useLoginMutation} = apiSlice;

// Export the API slice reducer
export default apiSlice;

