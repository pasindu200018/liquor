import { API } from "../constants/api";
import { apiSlice } from "./apiSlice";

export const inventoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllInventory: builder.query({
			query: () => ({
				url: `${API.BASE_URL}${API.PORT.ID}${API.INVENTORY_URL }`,
				method: 'GET',
			}),
		}),
		createAInventory: builder.mutation({
			query: (data) => ({
				url: `${API.BASE_URL}${API.PORT.ID}${API.INVENTORY_URL }/save`,
				method: 'POST',
				body:data,
			}),
		}),
		
    })
})

export const { useGetAllInventoryQuery, useCreateAInventoryMutation } = inventoryApiSlice