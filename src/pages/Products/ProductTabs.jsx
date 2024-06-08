import { useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Rating from "./Rating";
import SmallProduct from "./SmallProduct";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem] text-black">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>

        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Review
        </div>

        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2 text-white">
                  <label
                    htmlFor="rating"
                    className="block text-blue-700 text-xl mb-2"
                  >
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[10rem] text-black bg-blue-100 border-none outline-none"
                  >
                    <option value="">Select</option>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                  </select>
                </div>

                <div className="my-2">
                  {/* <label htmlFor="comment" className="block text-blue-700 text-xl mb-2">
                    Comment
                  </label> */}
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    placeholder="Write your feedback here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg text-black xl:w-[30rem] border-none outline-none "
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-black text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">Sign In</Link>to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p className="text-black">No Reviews</p>}</div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-blue-100 p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[30rem] sm:w-[12rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-black text-lg">{review.name}</strong>
                    <p className="text-zinc-500 text-sm">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-3 text-md text-zinc-600">{review.comment}</p>
                  <Rating value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <section>
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id} className="text-black">
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
