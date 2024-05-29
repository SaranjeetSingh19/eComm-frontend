import { Link } from "react-router-dom";

const Product = ({ product }) => {
  console.log(product);
  return (
    <div className="w-[20rem] ml-[2rem]  p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[26rem] h-[15rem] rounded"
        />
        {/* <HeartIcon product={product}/> */}
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span
              className="bg-pink-100
            text-sm text-pink-700 font-medium mr-2 px-2.5 py-0.5 
            rounded-full dark:bg-pink-900 dark:text-pink-300"
            >
               ₹ {product.price}

            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
