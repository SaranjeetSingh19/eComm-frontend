import React, { useCallback, useEffect } from "react";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import moment from "moment";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  useEffect(() => {
    refetch()
  } , [refetch])

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

 

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="text-white text-xl font-bold h-12 ml-[2rem]">
            All Products ({products.length})
          </div>
          <div className="flex flex-wrap justify-around items-center">
            {products.map((pro) => (
              <Link
                key={pro._id}
                to={`/admin/product/update/${pro._id}`}
                className="block overflow-hidden mb-4"
              >
                <div className="flex text-white">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="w-[6rem] object-cover"
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <h5 className="text-xl mb-2 font-semibold">
                        {pro?.name}
                      </h5>

                      <p className="text-white  text-sm">
                        {moment(pro.createAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-white xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                      {pro?.description?.substring(0, 120)}...
                    </p>

                    <div className="flex justify-between">
                      <Link
                        to={`/admin/product/update/${pro._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
                         bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none
                          focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700
                           dark:focus:ring-pink-800"
                      >
                        Update Product
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p>₹ {pro?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
