import moment from "moment";
import React, { useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
import ProductTabs from "./ProductTabs";
import Rating from "./Rating";

const ProductDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data || error?.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart")
  };

  return (
    <>
      <div className="" >
        <Link
          to="/"
          className="text-black font-semibold"
        >
          <FaArrowAltCircleLeft className="text-black text-3xl ml-[5.8rem]"/>
       
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[6rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[30rem] p-2  
                lg:w-[25rem] md:w-[17rem] sm:w-[12rem] mr-[2rem] h-[29rem]
                "
              />
              <HeartIcon product={product}/>
            </div>
            <div className="flex flex-col justify-between w-[30rem] text-black ml-[1rem]">
              <h2 className="text-2xl font-semibold">
                {product.name}
              </h2>
              <p className="my-2 xl:w-[28rem] lg:w-[22rem] md:w-[17rem] text-xl text-zinc-500">
                {product.description.substring(0, 150)}...
              </p>
              <p className="text-4xl my-4 font-extrabold text-rose-500">
                ₹ {product.price}
              </p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6 text-black">
                    <FaStore className="mr-2" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 text-black">
                    <FaClock className="mr-2 " /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6 text-black">
                    <FaStar className="mr-2 text-yellow-300 shadow-xl" /> Reviews: {product.numReviews}
                  </h1>
                </div>

                <div className="two text-white">
                  <h1 className="flex items-center mb-6 text-black">
                    <FaStar className="mr-2 text-yellow-300 shadow-xl"/> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6 text-black">
                    <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 text-black">
                    <FaBox className="mr-2 text-black" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap ">
                <Rating 
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[5rem] rounded-lg text-blue-600"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  className="bg-black text-white py-2 px-4 rounded-lg mt-6"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="mt-[3.5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
