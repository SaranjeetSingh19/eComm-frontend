import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";
// import { server } from "../../utils/config";

const baseQuery = fetchBaseQuery({ baseUrl: "https://ecomm-backend-2jri.onrender.com" });

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
}); 
