import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavouriteCount from "../Products/FavouriteCount";
import "./Navigation.css";

import { FaRobot } from "react-icons/fa";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "hidden" : "flex"}
      xl:flex  lg:flex lg:pr-12 md:flex md:pr-16 sm:flex sm:pr-16 flex-col justify-between p-4 
      text-black bg-gradient-to-r from-rose-500 to-rose-100  bg-rose-400 w-[4.5%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className=" flex flex-col justify-center space-y-1">
        <Link
          to="/"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div
            className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Home </span>{" "}
          </div>
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div
            className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="  nav-item-name mt-[3rem]">Shop</span>{" "}
          </div>
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div
            className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>

          <div className="absolute top-9 left-4">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-teal-700 rounded-full">
                  {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link
          to="/favourite"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div
            className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2"
          >
            <FaRegHeart className="mr-2 mt-[3rem] text-black" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">
              Favourite
            </span>{" "}
            <FavouriteCount />
          </div>
        </Link>

        <Link
          to="/gptsearch"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div
            className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2"
          >
            <FaRobot className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">GPT</span>{" "}
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex ml-1 items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="https://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-2 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-12 mr-4 rounded-lg  space-y-3 text-center py-2 bg-blue-400 text-gray-200 
            ${!userInfo.isAdmin ? "-top-32 -mt-4" : "-top-80"}
            `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="black px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="black px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="black px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="black px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="black px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li className="mb-2">
              <Link
                to="/profile"
                className="black px-4 py-2 hover:bg-blue-800 rounded-md"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logoutHandler}
                to="/logout"
                className="black px-4 py-2 hover:bg-blue-800 rounded-md"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform
      transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform
      transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">
                Register
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
