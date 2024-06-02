import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';

// Define a service using a base URL and expected endpoints
const cookies = new Cookies();
export const UserInfoSlice = createApi({
    reducerPath: 'userApi',
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_HOST }),
    endpoints: (builder) => ({
        getUserInformations: builder.query({
            query: (acount: string) => {
                return {
                    url: `/api/users/${acount}?populate=profileImage`,
                    headers: {
                        Authorization: `Bearer ${cookies.get("jwt")}`
                    }
                };
            },
            providesTags: [{ type: 'User' }],
        })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserInformationsQuery } = UserInfoSlice