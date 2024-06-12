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
        } bg-white p-1 fixed text-white rounded-full`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="black" />
        ) : (
          <>
            <div className="w-6 h-0.5 my-1 bg-black"></div>
            <div className="w-6 h-0.5 my-1 bg-black"></div>
            <div className="w-6 h-0.5 my-1 bg-black"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-rose-300 rounded-lg p-2 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-1 px-2 mb-3 bg-white rounded-sm"
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
                className="list-item py-1 px-2 mb-3 bg-white rounded-sm"
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
                className="list-item py-1 px-2 mb-3 bg-white rounded-sm"
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
                className="list-item py-1 px-2 mb-3 bg-white rounded-sm"
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
                className="list-item py-1 px-2 mb-3 bg-white rounded-sm"
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
                className="list-item py-1 px-2 mb-3 bg-white rounded-sm"
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
