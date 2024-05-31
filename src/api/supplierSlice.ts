import { API } from "../constants/api";
import { apiSlice } from "./apiSlice";


export const supplierApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSupplier: builder.query({
			query: () => ({
				url: `${API.BASE_URL}${API.PORT.ID}${API.SUPPLIER_URL}/getAllSuppliers`,
				method: 'GET',
			}),
		}),
		createASupplier: builder.mutation({
			query: (data) => ({
				url: `${API.BASE_URL}${API.PORT.ID}${API.SUPPLIER_URL }/save`,
				method: 'POST',
				body: data,
			}),
		}),
		
    })
})

export const { useGetAllSupplierQuery, useCreateASupplierMutation } = supplierApiSlice