import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";
import { server } from "../../utils/config";

const baseQuery = fetchBaseQuery({ baseUrl: `${server}` });

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({
    
  }),
}); 
