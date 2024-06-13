import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import ProductCard from "./Products/ProductCard";
import Loader from "../components/Loader";

const Shop = () => {
  const dispatch = useDispatch();

  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery?.data?.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((x) => x !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto pl-16 ">
        <h1 className="text-[3.5rem] border-b-2 border-black">Shop.</h1>
        <div className="flex md:flex-row">
          <div className="p-3 h-max mt-2 mb-2">
            <h2 className="text-white py-2 text-center mb-2 rounded-full bg-rose-400">
              Filtered By Categories
            </h2>
            <div className="p-5 w-[15rem] ">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex mr-4 items-center">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300
                       rounded focus:ring-blue-700 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                         dark:border-gray-600"
                    />
                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="py-2 text-center bg-rose-400 text-white rounded-full mb-2">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand, i) => (
                  <div key={i} className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300
                       focus:ring-blue-700 dark:focus:ring-blue-600 dark:ring-offset-gray-800
                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2  text-sm font-medium text-black dark:text-gray-400"
                    >
                      {brand}
                    </label>
                  </div>
              ))}
            </div>
            <h2 className="text-center py-2 bg-emerald-400 rounded-full mb-2">
              Filter by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border 
                rounded-lg focus:outline-none outline-none border-none focus:ring focus:border-rose-300"
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                className="text-lg"
                onClick={() => window.location.reload()}
              >
                <FaSyncAlt />
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 mb-2 text-center ">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products.map((prod) => (
                  <div className="p-3" key={prod._id}>
                    <ProductCard prod={prod} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
