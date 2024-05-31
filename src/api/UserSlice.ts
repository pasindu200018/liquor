import { API } from '../constants/api'
import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({

		getAllUser: builder.query({
			query: () => ({
				url: `${API.BASE_URL}${API.PORT.AD}${API.AUTH_URL }/getAllUsers`,
				method: 'GET',
			}),
		}),
		getAUser: builder.query({
			query: (ID) => ({
				url: `${API.BASE_URL}${API.PORT.AD}${API.AUTH_URL }/${ID}`,
				method: 'GET',
			}),
		}),
		deleteAUser: builder.query({
			query: (ID) => ({
				url: `${API.BASE_URL}${API.PORT.AD}${API.AUTH_URL }/${ID}`,
				method: 'GET',
			}),
		}),
        
	}),
})

export const { useGetAllUserQuery, useGetAUserQuery } = authApiSlice
