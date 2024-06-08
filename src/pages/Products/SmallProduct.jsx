import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[15rem]  ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="rounded h-40 w-56"
        />
        <HeartIcon product={product}/> 

        <div className="p-54">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center mt-3">
              <div>{product.name}</div>
              <span className="bg-teal-100 text-teal-800 font-medium 
              rounded-full dark:bg-teal-900 dark:text-teal-400
              text-sm mr-2 px-2.5 py-0.5">
                ₹ { product.price} 
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
