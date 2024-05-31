import { API } from "../constants/api";
import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
			query: () => ({
				url: `${API.BASE_URL}${API.PORT.PO}${API.ORDER_URL }`,
				method: 'GET',
			}),
		}),
		createAOrder: builder.mutation({
			query: (data) => ({
				url: `${API.BASE_URL}${API.PORT.PO}${API.ORDER_URL }`,
				method: 'POST',
				body: data,
			}),
		}),
		
    })
})

export const { useGetAllOrderQuery, useCreateAOrderMutation } = orderApiSlice