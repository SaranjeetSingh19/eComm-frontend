import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  // console.log(cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
 

  useEffect(() => {
    if (!cart.shippingAddress.address) {
        navigate("/shipping"); 
      // navigate("/placeorder");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      console.log("chla 1");
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log("chla 2");
      dispatch(clearCartItems());
      console.log(res);
      console.log("chla 3");
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.message || "Something went wrong 4");
      console.error(error?.message);
      console.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="mt-8 mx-auto container">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="pl-20 py-2 text-left align-top">Image</td>
                  <td className=" py-2 text-left ">Product</td>
                  <td className=" py-2 text-left ">Quantity</td>
                  <td className=" py-2 text-left ">Price</td>
                  <td className=" py-2 text-left ">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 pl-20">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-7 pl-20">
          <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
          <div className="flex flex-wrap justify-between p-4 pr-16 bg-gradient-to-t from-white to-gray-300 rounded-xl">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> ₹
                {cart.itemsPrice}
              </li>

              <li>
                <span className="font-semibold mb-4">Shipping:</span> ₹
                {cart.shippingPrice}
              </li>

              <li>
                <span className="font-semibold mb-4">Tax:</span> ₹
                {cart.taxPrice}
              </li>

              <li>
                <span className="font-semibold mb-4">Total:</span> ₹
                {cart.totalPrice}
              </li>
            </ul>
            {error && (
              <Message variant="danger">{error?.data?.message}</Message>
            )}

            <div>
              <h2 className="mb-4 font-semibold text-2xl">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-semibold text-2xl">Payment Method</h2>
              <strong>Method: </strong> {cart.paymentMethod}
            </div>
          </div>
          <button
            type="button"
            className="bg-black text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            onClick={placeOrderHandler}
            disabled={cart.cartItems === 0}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
