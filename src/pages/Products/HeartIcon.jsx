import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addtoFavourites,
  removeFromFavourite,
  setFavourites,
} from "../../redux/features/favourite/favouriteSlice";
import {
  addFavouritesToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouritesToLocalStorage,
} from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourite = favourites.some((prod) => prod._id === product._id);
 
  useEffect(() => {
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
    dispatch(setFavourites(favouritesFromLocalStorage));
  }, []);

  const toggleButton = () => {
    if(isFavourite){
        dispatch(removeFromFavourite(product))
        //Removing product from localStorage as well
        removeFavouritesToLocalStorage(product._id) 
    }else{
        dispatch(addtoFavourites(product))
        //Adding product from localStorage as well
        addFavouritesToLocalStorage(product)
    }
  }

  return (
    <div onClick={toggleButton} className="absolute top-2 right-5 cursor-pointer">
      {isFavourite ? (
        <FaHeart  className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-pink-700 font-extrabold" />
      )}
    </div>
  );
};

export default HeartIcon;
