import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [isPaid, setIsPaid] = useState(false);

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  function onApprove(data, actions) {
    return actions?.order?.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onError(err) {
    toast.error(err?.message || "Payment failed");
  }

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "INR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  useEffect(() => {
    if (order) {
      setIsPaid(order.isPaid);
    }
  }, [order]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message}</Message>
  ) : (
    <div className="container flex flex-col justify-center px-16 md:flex-row">
      <div className="pr-4 md:2/3">
        <div className="border gray-700 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto ">
              <table className="w-[100%]">
                <thead className="border-b-2 border-zinc-300">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center"> {item.qty}</td>
                      <td className="p-2 text-center"> {item.price}</td>
                      <td className="p-2 text-center">
                        ₹ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-400 pb-4 mb-4 ">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-rose-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-rose-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-rose-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-rose-500">Address:</strong>{" "}
            {order.shippingAddress.address},{order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-rose-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Paid on: {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[rem]">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>₹ {order.itemsPrice}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₹ {order.shippingPrice}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>₹ {order.taxPrice}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>₹ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
