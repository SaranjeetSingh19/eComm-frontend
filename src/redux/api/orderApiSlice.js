import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    // Add the mock payment mutation
    mockPayOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/mock-payment/${orderId}`,
        method: "PUT",
      }),
    }),

    // getPaypalClientId: builder.query({
    //   query: () => ({
    //     url: PAYPAL_URL,
    //   }),
    // }),

    getMyOrder: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
  }),
});

// const orderApiSlice = createApi({
//   reducerPath: "orderApiSlice",
//   baseQuery: fetchBaseQuery({ baseUrl: `y/api/orders` }),
//   tagTypes: ["Product", "Order", "User", "Category"],
//   endpoints: (builder) => ({
//         createOrder: builder.mutation({
//       query: (order) => ({
//         url: "/home",
//         method: "POST",
//         body: order,
//       }),
//     }),
//   })
// })

export default orderApiSlice;
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrderQuery,
  useDeliverOrderMutation,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useGetOrdersQuery,
  useMockPayOrderMutation,
} = orderApiSlice;
