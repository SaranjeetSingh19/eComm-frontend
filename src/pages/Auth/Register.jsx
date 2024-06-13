import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [register, { isLoading }] = useRegisterMutation();
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log(res);
        navigate(redirect);
        toast.success("User successfully registered 🥳");
      } catch (error) {
        console.log(error);
        console.log(error?.data?.message);
        toast.error(error?.data?.message || "Something went wrong 3");
      }
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap justify-center">
      <div className="mr-[4rem] mt-[2rem]">
        <h1 className="text-black text-4xl font-semibold mb-2">
          welcome to <span className="text-rose-500">Shifsy</span> <br />{" "}
          <span className="text-2xl">create your account</span>
        </h1>
        <form onSubmit={submitHandler} className="container w-[30rem]">
          <div className="my-[1.5rem]">
            <input
              type="text"
              id="name"
              value={username}
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border-none outline-none rounded-2xl w-full"
            />
          </div>
          <div className="my-[2rem]">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border-none outline-none rounded-2xl w-full"
            />
          </div>
          <div className="my-[2rem]">
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border-none outline-none rounded-2xl w-full"
            />
          </div>
          <div className="my-[2rem]">
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 border-none outline-none rounded-2xl w-full"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-500 px-4 text-white py-2 rounded-full cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create My Account"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <div className="text-black">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : `/login`}
              className="text-rose-400 hover:text-rose-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
