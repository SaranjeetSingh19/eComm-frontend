import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-emerald-600 p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 my-1 bg-white"></div>
            <div className="w-6 h-0.5 my-1 bg-white"></div>
            <div className="w-6 h-0.5 my-1 bg-white"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-green-300 p-4 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3  mb-5 bg-white rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                className="list-item py-2 px-3  mb-5 bg-white rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                Create Category
              </NavLink>
            </li>

            <li>
              <NavLink
                className="list-item py-2 px-3  mb-5 bg-white rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                Create Product
              </NavLink>
            </li>

            <li>
              <NavLink
                className="list-item py-2 px-3  mb-5 bg-white rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                All Products
              </NavLink>
            </li>


            <li>
              <NavLink
                className="list-item py-2 px-3  mb-5 bg-white rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                className="list-item py-2 px-3  mb-5 bg-white rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
