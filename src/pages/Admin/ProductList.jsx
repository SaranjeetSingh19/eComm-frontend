import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories, refetch } = useFetchCategoriesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data?.error) {
        console.log(data?.error);
        toast.error("Product creation failed. Try again 1");
      } else {
        toast.success(`${data?.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product creation failed. Try again 2");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res?.message);
      setImage(res?.image);
      setImageUrl(res?.image);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="container sm:mx-[0]">
      <div className="flex justify-around flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4  p-3">
          <div className="h-12 text-black text-3xl border-b-2 border-black">
            Create Product.
          </div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[10rem] w-[10rem] mt-2"
              />
            </div>
          )}
          <div className="mb-3">
            <label
              className="px-4 text-white border block 
            w-full text-center text-2xl rounded-lg cursor-pointer font-bold py-11 "
            >
              {image ? (
                image.name
              ) : (
                <span className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-500">
                  Upload Image
                </span>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                />
              </div>

              <div className="two ml-10">
                <br />
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                />
              </div>

              <div className="three">
                <br />
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                />
              </div>

              <div className="four ml-10">
                <br />
                <input
                  type="text"
                  value={brand}
                  placeholder="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                />
              </div>
            </div>

            <textarea
              type="text"
              className="p-2 mb-3 rounded-2xl border-none w-[92%] mt-6"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex ">
              <div className="mr-10">
                <label htmlFor="name block" className="text-black ml-1">
                  Count In Stock
                </label>{" "}
                <br />
                <input
                  type="text"
                  placeholder="Count In Stock"
                  className="mt-3 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="" className="text-black">
                  Category
                </label>{" "}
                <br />
                <select
                  placeholder="Choose category"
                  className="mt-3 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="py-1 px-4 mt-5 rounded-lg text-lg font-bold bg-black text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
