import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

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
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append("image", image);
      productData.append("brand", brand);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("name", name);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try again");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product creation failed. Try again");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] ">
      <div className="flex flex-col md:flex-row">
        {/* Admin MENU */}
        <div className="md:w-3/4  p-3">
          <div className="h-12 text-white">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label
              className="px-4 text-white border block 
            w-full text-center rounded-lg cursor-pointer font-bold py-11"
            >
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name" className="text-red-400">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3 p-4 w-[25rem] border rounded-lg text-white bg-blue-400"
                />
              </div>

              <div className="two ml-10">
                <label htmlFor="name block" className="text-red-400">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mb-3 p-4 w-[25rem] border rounded-lg text-white bg-blue-400"
                />
              </div>

              <div className="three">
                <label htmlFor="name block" className="text-red-400">
                  Quantity
                </label>
                <br />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mb-3 p-4 w-[25rem] border rounded-lg text-white bg-blue-400"
                />
              </div>

              <div className="four ml-10">
                <label htmlFor="name block" className="text-red-400">
                  Brand
                </label>
                <br />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mb-3 p-4 w-[25rem] border rounded-lg text-white bg-blue-400"
                />
              </div>
            </div>
            <label htmlFor="" className="text-red-400 my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-yellow-300 border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block" className="text-red-400">
                  Count In Stock
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-pink-400 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="" className="text-red-400">
                  Category
                </label>{" "}
                <br />
                <select
                  placeholder="Choose category"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-orange-400 text-white"
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
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-400"
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
