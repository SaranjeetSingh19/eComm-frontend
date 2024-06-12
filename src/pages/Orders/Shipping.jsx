import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProgressSteps from "../../components/ProgressSteps";
import { savePaymentMethod, saveShippingAddress } from "../../redux/features/cart/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch( saveShippingAddress({address,  city, postalCode,  country}))
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2  />

      <div className="flex mt-[1.5rem] justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[50rem]">
          <h1 className="mb-3 font-semibold text-4xl border-b-2 border-black">
            Shipping.
          </h1>
          <div className="mb-4">
            {/* <label className="block text-black mb-0">Address</label> */}
            <input
              type="text"
              className="mt-2 p-2  mb-2  border-none outline-none rounded-2xl w-[25rem]"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-black mb-0">City</label> */}
            <input
              type="text"
              className="mt-1 p-2 mb-2 border-none outline-none rounded-2xl w-[25rem]"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-black mb-0">Postal code</label> */}
            <input
              type="text"
              className="mt-1 p-2 mb-2 border-none outline-none rounded-2xl w-[25rem]"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-black mb-0">Country</label> */}
            <input
              type="text"
              className="mt-1 p-2 mb-2 border-none outline-none rounded-2xl w-[25rem]"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-rose-600"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Paypal or Credit Card</span>
              </label>
            </div>
          </div>
          <button type="submit" className="bg-rose-600 text-white py-2 px-4 rounded-full text-lg">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
