import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
 

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[20rem] ml-4 sm:ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg sm:w-[26rem] h-[15rem] rounded"
        />
        <HeartIcon product={product}/>
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-xl text-black">{product.name}</div>
            <span
              className="bg-teal-100
            text-sm text-teal-700 font-medium mr-2 px-2.5 py-0.5 
            rounded-full dark:bg-teal-900 dark:text-teal-300"
            >
               ₹ {product.price}
  
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
}  

export default Product;
