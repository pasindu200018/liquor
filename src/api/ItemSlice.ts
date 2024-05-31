import { API } from "../constants/api";
import { apiSlice } from "./apiSlice";


export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllItem: builder.query({
			query: () => ({
				url: `${API.BASE_URL}${API.PORT.PO}${API.ITEM_URL }`,
				method: 'GET',
			}),
		}),
		createAItem: builder.mutation({
			query: (data) => ({
				url: `${API.BASE_URL}${API.PORT.PO}${API.ITEM_URL }/save`,
				method: 'POST',
				body: data,
			}),
		}),
		
    })
})

export const { useGetAllItemQuery, useCreateAItemMutation } = itemApiSlice