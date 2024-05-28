import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import {toast} from "react-toastify"

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

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
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("name", name);
      formData.append("countInStock", stock);

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

      const {data} = await deleteProduct(params._id)
      toast.success(`${data.name} is deleted`)
      navigate("/admin/allproductslist")


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
    <div className="container xl:mx-[9rem] sm:mx-[0] ">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4  p-3">
          <div className="h-12 text-white">Create Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
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
            <div>
              <button
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-400 mr-4"
                onClick={handleSubmit}
              >
                Update
              </button>

              <button
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-400"
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
