import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
// import App from "./App.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import AdminRoute from "./pages/Admin/AdminRoute.jsx";
// import AllProducts from "./pages/Admin/AllProducts.jsx";
// import CategoryList from "./pages/Admin/CategoryList.jsx";
// import ProductList from "./pages/Admin/ProductList.jsx";
// import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
// import UserList from "./pages/Admin/UserList.jsx";
// import GptPage from "./pages/Auth/GptPage.jsx";
// import Login from "./pages/Auth/Login.jsx";
// import Register from "./pages/Auth/Register.jsx";
// import Home from "./pages/Home.jsx";
// import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
// import Shipping from "./pages/Orders/Shipping.jsx";
// import Cart from "./pages/Products/Cart.jsx";
// import Favourites from "./pages/Products/Favourites.jsx";
// import ProductDetails from "./pages/Products/ProductDetails.jsx";
// import Shop from "./pages/Shop.jsx";
// import Profile from "./pages/User/Profile.jsx";
import Loader from "./components/Loader.jsx";
import NotFound from "./pages/NotFound.jsx";
import store from "./redux/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import OrderList from "./pages/Admin/OrderList.jsx";
// import Order from "./pages/Orders/Order.jsx";
// import UserOrder from "./pages/Orders/UserOrder.jsx";

// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = lazy(() => import("./App.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const AdminRoute = lazy(() => import("./pages/Admin/AdminRoute.jsx"));
const AllProducts = lazy(() => import("./pages/Admin/AllProducts.jsx"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList.jsx"));
const ProductList = lazy(() => import("./pages/Admin/ProductList.jsx"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate.jsx"));
const UserList = lazy(() => import("./pages/Admin/UserList.jsx"));
const GptPage = lazy(() => import("./pages/Auth/GptPage.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));

const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
const Cart = lazy(() => import("./pages/Products/Cart.jsx"));
const Favourites = lazy(() => import("./pages/Products/Favourites.jsx"));
const ProductDetails = lazy(() =>
  import("./pages/Products/ProductDetails.jsx")
);
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Profile = lazy(() => import("./pages/User/Profile.jsx"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));
const OrderList = lazy(() => import("./pages/Admin/OrderList.jsx"));
const Order = lazy(() => import("./pages/Orders/Order.jsx"));
const UserOrder = lazy(() => import("./pages/Orders/UserOrder.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      }
    >
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      />
      <Route
        path="/favourite"
        element={
          <Suspense fallback={<Loader />}>
            <Favourites />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/shop"
        element={
          <Suspense fallback={<Loader />}>
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/user-order"
        element={
          <Suspense fallback={<Loader />}>
            <UserOrder />
          </Suspense>
        }
      />

      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        }
      />
      <Route
        index={true}
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path=""
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoute />
          </Suspense>
        }
      >
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/gptsearch"
          element={
            <Suspense fallback={<Loader />}>
              <GptPage />
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense fallback={<Loader />}>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/placeorder"
          element={
            <Suspense fallback={<Loader />}>
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<Loader />}>
              <Order />
            </Suspense>
          }
        />
      </Route>

      {/* Admin routes 👇🏻 */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<Loader />}>
            <AdminRoute />
          </Suspense>
        }
      >
        <Route
          path="userlist"
          element={
            <Suspense fallback={<Loader />}>
              <UserList />
            </Suspense>
          }
        />
        <Route
          path="categorylist"
          element={
            <Suspense fallback={<Loader />}>
              <CategoryList />
            </Suspense>
          }
        />
        <Route
          path="allproductslist"
          element={
            <Suspense fallback={<Loader />}>
              <AllProducts />
            </Suspense>
          }
        />
        <Route
          path="productlist/"
          element={
            <Suspense fallback={<Loader />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="product/update/:_id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductUpdate />
            </Suspense>
          }
        />
        <Route
          path="orderlist"
          element={
            <Suspense fallback={<Loader />}>
              <OrderList />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
