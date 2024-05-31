// import { AUTH_URL } from "../constants/api";
import { API } from "../constants/api";
import { apiSlice } from "./apiSlice";



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data)=>({
                url:`${API.BASE_URL}${API.PORT.AD}${API.AUTH_URL }/login`,
                method: "POST",
                body: data,
            })
        }),
        
        register: (builder.mutation)({
            query: (data)=>({
                url:`${API.BASE_URL}${API.PORT.AD}${API.AUTH_URL }/singup`,
                method: "POST",
                body: data,
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice 