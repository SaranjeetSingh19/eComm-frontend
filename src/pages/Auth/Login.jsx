import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome Back ${res.username} 😎`);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-[#E0E6EC]">
      <section className="pl-[10rem] flex flex-wrap justify-center items-center">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-black text-3xl font-semibold mb-4">
           Login your account
          </h1>
          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              {/* <label
                htmlFor="email"
                className="black ml-2 text-sm font-medium text-white"
              >
                Email Address
              </label> */}
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border-none outline-none rounded-2xl w-[25rem]"
              />
            </div>

            <div className="my-[2rem]">
              {/* <label
                htmlFor="password"
                className="black text-sm ml-2 font-medium text-white"
              >
                Password
              </label> */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 p-2 border-none outline-none rounded-2xl w-[25rem]"
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-3xl my-[1rem] "
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-black">
              New Customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-rose-400 hover:text-rose-600"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
