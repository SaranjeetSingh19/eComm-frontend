import React from "react";
import { useSelector } from "react-redux";

const FavouriteCount = () => {
  const favourite = useSelector((state) => state.favourites);
  const favLength = favourite.length;
  return (
    <div className="absolute left-5 top-8">
      {favLength > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favLength}
        </span>
      )}
    </div>
  );
};

export default FavouriteCount;
