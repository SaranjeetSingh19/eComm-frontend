import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetMyOrderQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrderQuery();

  return (
    <div className="container px-20">
      <h2 className="text-4xl border-b-2 border-black font-semibold mb-4">
        My Orders.
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error || "Something went wrong 7"}
        </Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2"></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[5rem] h-[4rem] rounded-md mb-5"
                />
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2"> ₹ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center text-white bg-green-500 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center text-white bg-rose-500 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="py-2 px-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center text-white bg-green-500 w-[6rem] rounded-full">
                      Delivered
                    </p>
                  ) : (
                    <p className="p-1 text-center text-white bg-rose-500 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                    <Link to={`/order/${order._id}`}>
                        <button className="bg-black text-white py-2 px-3 rounded-lg">
                            View Details
                        </button>
                    </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
