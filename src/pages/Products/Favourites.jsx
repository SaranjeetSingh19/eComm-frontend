import { useSelector } from "react-redux";
import Product from "./Product";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);

  return (
    <div className="ml-4 sm:ml-[10rem]">
      {favourites.length > 0 ? (
        <>
          {" "}
          <h1 className="text-xl text-black font-bold ml-[3rem] mt-[3rem]">
            FAVOURITE PRODUCTS
          </h1>
          <div className="flex flex-wrap text-black justify-center sm:justify-start">
            {favourites?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-full w-full py-40">
          <h1 className="text-2xl">
            Oops... Do'nt you have any favourites to add? 
          </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;
