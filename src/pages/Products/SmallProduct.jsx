import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[14rem]  ml-[2.5rem]  p-2 ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="rounded h-40 w-56"
        />
        <HeartIcon product={product} />

        <div className="p-5">
          <Link to={`/product/${product._id}`}>
            <div className="">
              <div className="text-sm truncate -mt-3">{product.name}</div>
              <span className="bg-teal-200 w-16 text-teal-800 font-medium text-xs rounded-full dark:bg-teal-900 dark:text-teal-400  px-2.5 py-0.5 flex items-center mt-1">
                ₹{product.price}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
