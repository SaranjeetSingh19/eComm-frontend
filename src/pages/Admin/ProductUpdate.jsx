import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData, refetch } = useGetProductByIdQuery(params._id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.categories?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("countInStock", stock);
      formData.append("image", image);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("name", name);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success(`Product updated successfully`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product updation failed. Try again");
    }
  };

  const handleDelete = async (e) => {
    try {
      // let ans = window.confirm("Pakka Uda Du?")
      // if(!ans) return

      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.log(error);
      toast.error("Product deletion failed. Try again");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    }
  };

  return (
    <div className="container sm:mx-[0]">
      <div className="flex justify-around flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4  p-3">
          <div className="h-12 text-3xl text-black border-b-2 border-black">
            Update Product.
          </div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mt-3 mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label
              className="px-4 text-white border block 
          w-full text-center rounded-lg cursor-pointer font-bold py-6"
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
                <label htmlFor="name" className="text-rose-600">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl mb-4 w-[24rem]"
                />
              </div>

              <div className="two ml-10">
                <label htmlFor="name block" className="text-rose-600">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                />
              </div>

              <div className="three">
                <label htmlFor="name block" className="text-rose-600">
                  Quantity
                </label>
                <br />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl mb-4 w-[24rem]"
                />
              </div>

              <div className="four ml-10">
                <label htmlFor="name block" className="text-rose-600">
                  Brand
                </label>
                <br />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                />
              </div>
            </div>
            <label htmlFor="" className="text-rose-600">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 rounded-2xl border-none w-[92%] mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex ">
              <div className="mr-10">
                <label htmlFor="name block" className="text-rose-600">
                  Count In Stock
                </label>
                <br />
                <input
                  value={stock}
                  type="text"
                  className="mt-2 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="" className="text-red-600">
                  Category
                </label>{" "}
                <br />
                <select
                  placeholder="Choose category"
                  className="mt-2 p-2 border-none outline-none py-3 rounded-2xl w-[24rem]"
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
            <div className=" flex gap-x-6">
              <button
                className="py-1 px-4 mt-5 rounded-lg text-lg font-bold bg-black text-white"
                onClick={handleSubmit}
              >
                Update
              </button>

              <button
                className="py-1 px-4 mt-5 rounded-lg text-lg font-bold bg-rose-600 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
