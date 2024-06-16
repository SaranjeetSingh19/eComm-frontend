import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="ml-4 sm:ml-[20rem] mt-4 sm:mt-[10rem] text-rose-500 text-[3rem]">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-black text-white font-bold rounded-full py-2 px-10 mr-4 sm:mr-[18rem] mt-4 sm:mt-[10rem]"
            >
              Shop
            </Link>
          </div>
          
          <div>
            <div className="px-4 sm:px-24 flex flex-wrap justify-center sm:justify-between mt-[2rem] text-white">
              {data?.products?.map((product) => (
                <div key={product._id} className="w-full sm:w-auto">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
