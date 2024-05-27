import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'universal-cookie';
// import { IProduct } from '../../../types';

// Define a service using a base URL and expected endpoints
const cookies = new Cookies();
export const productSlice = createApi({
  reducerPath: 'productsApi',
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_HOST }),
  endpoints: (builder) => ({
    getDahboardProducts: builder.query({
      query: (page: number) => {
        return {
          url: `/api/products?populate=thumbnail,category&pagination[${page}]=1&pagination[pageSize]=10`
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ id }: {id: number}) => ({ type: 'products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    deleteDahboardProducts: builder.mutation({
      query: (id: number) => {
        return {
          url: `/api/products/${id}`,
          method: "DELETE", 
          headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`
          }
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateDahboardProducts: builder.mutation({
      query: ({id, body}: {id: number, body: FormData}) => {
        return {
          url: `/api/products/${id}`,
          method: "PUT", 
          headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`
          }
          ,body
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      onQueryStarted: async ({id, ...patch}, {dispatch, queryFulfilled}) => {
        const patchResult = dispatch(
          productSlice.util.updateQueryData('getDahboardProducts', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }    
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDahboardProductsQuery, useDeleteDahboardProductsMutation, useUpdateDahboardProductsMutation } = productSlice