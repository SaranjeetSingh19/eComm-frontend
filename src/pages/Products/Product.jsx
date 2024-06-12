import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[19rem] ml-4 p-2 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg sm:w-[26rem] h-[15rem]"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-xl text-black truncate w-[12rem]">
              {product.name}
            </div>
            <span
              className="bg-teal-100 text-sm text-teal-700 font-medium px-2.5 py-0.5 
            rounded-full dark:bg-teal-900 dark:text-teal-300 flex items-center"
            >
              ₹{product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
