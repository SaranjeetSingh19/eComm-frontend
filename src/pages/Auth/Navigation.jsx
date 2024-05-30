import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";
import FavouriteCount from "../Products/FavouriteCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
      xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 
      text-white bg-black w-[4.5%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className=" flex flex-col justify-center space-y-1">
        <Link
          to="/"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME </span>{" "}
          </div>
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="  nav-item-name mt-[3rem]">SHOP</span>{" "}
          </div>
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
          </div>
        </Link>

        <Link
          to="/favourite"
          className="flex items-center transition-transform
        transform hover:translate-x-2"
        >
          <div className="flex justify-center items-center 
          transition-transform transform hover:translate-x-2">
            <FaHeart className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">
              Favourite
            </span>{" "}
            <FavouriteCount />
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
            className={`absolute right-0 mt-12 mr-11 rounded-lg  space-y-3 text-center py-2 bg-zinc-800 text-gray-200 
            ${!userInfo.isAdmin ? "-top-20 -mt-4" : "-top-80"}
            `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="black px-4 py-2 hover:bg-gray-400 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="black px-4 py-2 hover:bg-gray-400 rounded-md"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="black px-4 py-2 hover:bg-gray-400 rounded-md"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="black px-4 py-2 hover:bg-gray-400 rounded-md"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="black px-4 py-2 hover:bg-gray-400 rounded-md"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="black px-4 py-2 hover:bg-gray-400  rounded-md"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logoutHandler}
                to="/logout"
                className="black px-4 py-2 hover:bg-gray-400 rounded-md"
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
