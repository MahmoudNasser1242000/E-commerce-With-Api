import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { IProduct } from '../../../types';

// Define a service using a base URL and expected endpoints
export const categorySlice = createApi({
    reducerPath: 'categoriesApi',
    tagTypes: ["Categories"],
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_HOST }),
    endpoints: (builder) => ({
        getDahboardCategories: builder.query({
            query: (page) => {
                return {
                    url: `/api/categories?pagination[${page}]=1&pagination[pageSize]=10`,
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result?.data?.map(({ id }: { id: number }) => ({ type: 'Categories' as const, id })),
                        { type: 'Categories', id: 'LIST' },
                    ]
                    : [{ type: 'Categories', id: 'LIST' }],
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDahboardCategoriesQuery } = categorySlice