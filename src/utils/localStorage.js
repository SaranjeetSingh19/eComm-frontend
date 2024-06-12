// Add product from a localStorage
export const addFavouritesToLocalStorage = (product) => {
  const favourites = getFavouritesFromLocalStorage();
  if (!favourites.some((prod) => prod._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

// Remove product from a localStorage
export const removeFavouritesToLocalStorage = (productId) => {
  const favourites = getFavouritesFromLocalStorage();
  const updateFavourites = favourites.filter((prod) => prod._id !== productId);
  localStorage.setItem("favourites", JSON.stringify(updateFavourites));
};

//Reterive product from a localStorage
export const getFavouritesFromLocalStorage = () => {
  const favouritesJson = localStorage.getItem("favourites");
  return favouritesJson ? JSON.parse(favouritesJson) : [];
};
