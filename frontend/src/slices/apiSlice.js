import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // Define a tag type named 'User' for caching user data so we don't have to refetch it
    endpoints: (builder) => ({})
});