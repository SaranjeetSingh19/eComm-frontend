import { useSelector } from "react-redux";
import { selectFavouriteProduct } from "../../redux/features/favourite/favouriteSlice";
import Product from "./Product";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  
  return (
    <div className="ml-4 sm:ml-[10rem]">
      <h1 className="text-lg text-white font-bold ml-[3rem] mt-[3rem]">
        FAVOURITE PRODUCTS
      </h1>
      <div className="flex flex-wrap text-white justify-center sm:justify-start">
        {favourites?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}  

export default Favourites;
