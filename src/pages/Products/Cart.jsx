import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;


  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  };

  return (
    <>
      <div className="container flex justify-around item-start text-black wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="text-3xl">
            Your cart is empty! <Link to="/shop">Go shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] text-black">
              <h1 className="mb-4 font-semibold text-5xl border-b-2 border-black">Cart.</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex pb-2 mb-[1rem] items-center"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-teal-600">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-black">{item.brand}</div>
                    <div className="mt-2 text-black font-bold">
                      ₹ {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="p-1 w-full border rounded text-black"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="hover:text-black text-rose-40000 ml-[1rem] mt-[.5rem] cursor-pointer" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-xl font-bold text-green-400">
                    <span className="text-black">Total Amount</span>  ₹{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  <button 
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  className="rounded-full bg-black text-white mt-4 py-2 px-4 text-lg w-full">
                   Place Order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
