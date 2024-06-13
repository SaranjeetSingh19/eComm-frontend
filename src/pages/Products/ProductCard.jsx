import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
const ProductCard = ({ prod }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  function getRandomColor() {
    const colors = [
      "bg-pink-100",
      "bg-red-100",
      "bg-yellow-100",
      "bg-green-100",
      "bg-blue-100",
      "bg-indigo-100",
      "bg-purple-100",
      "bg-teal-100",
      "bg-orange-100",
      "bg-gray-100",
      "bg-teal-200",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const randomColor = getRandomColor();

  return (
    <div
      className={`max-w-sm relative ${randomColor}   w-[16rem] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700`}
    >
      <section className="relative">
        <Link to={`/product/${prod._id}`}>
          <span className="absolute bottom-3 right-3 bg-blue-100 text-black text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full ">
            {prod?.brand}
          </span>
          <img
            className="cursor-pointer w-full hover:rounded-md"
            src={prod?.image}
            alt={prod?.name}
            style={{ height: "120px", objectFit: "scale-down" }}
          />
        </Link>
        <HeartIcon product={prod} />
      </section>
      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text- text-black dark:text-white">
            {prod?.name.substring(0, 12)}...
          </h5>
          <p className="text-black font-semibold text-sm">
            {prod?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
        <p className="mb-3 font-normal text-sm text-zinc-600">
          {prod?.description?.substring(0, 50)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            className="inline-flex items-center px-3 py-2 text-sm font-medium 
             text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 
             focus:ring-4 focus:outline-none focus:ring-pink-300
              dark:bg-teal-600 dark:hover:bg-teal-700
               dark:focus:ring-teal-800"
            to={`/product/${prod._id}`}
          >
            Read More
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
          <button
            onClick={() => addToCartHandler(prod, 1)}
            className="p-2 rounded-full text-white bg-white "
          >
            <FaPlus className="text-black" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
