import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API } from "../constants/api";


const baseQuery = fetchBaseQuery({ baseUrl: API.BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});