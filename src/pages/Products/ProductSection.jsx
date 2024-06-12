import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Message from "../../components/Message";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import "../../../src/index.css";

const ProductSection = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[35rem]  lg:w-[33rem] md:w-[23rem] sm:w-[12rem]"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-[32rem] mx-auto rounded-lg  h-[20rem]"
                />

                <div className="mt-4 px-5 flex justify-between ">
                  <div className="one w-[10rem] mr-5">
                    <h2>{name}</h2>
                    <p className="text-rose-600 mt-2"> ₹ {price}</p> <br />{" "}
                    <br />
                    {/* <p className="w-[20rem]">
                      {description.substring(0, 70)} ...
                    </p> */}
                  </div>

                  <div className="flex justify-between w-[20rem]">
                    <div className="one  ">
                      <h1 className="flex items-center mb-4 ">
                        <FaStore className="mr-2 text-black" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-4">
                        <FaClock className="mr-2 text-black" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-4">
                        <FaStar className="mr-2 text-black" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-4">
                        <FaStar className="mr-2 text-black" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-4">
                        <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-4">
                        <FaBox className="mr-2 text-black" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductSection;
