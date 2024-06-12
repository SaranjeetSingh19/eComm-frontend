import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully 🫡");
      } catch (error) {
    console.log(error);
        toast.error(error?.data?.message || "Something went wrong 8");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[0.5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-4xl font-semifold mb-4 border-b-2 border-black">
            {" "}
            Update Profile.
          </h2>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input mt-1 p-2 border-none outline-none rounded-2xl w-[25rem]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input mt-1 p-2 border-none outline-none rounded-2xl w-[25rem]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input mt-1 p-2 border-none outline-none rounded-2xl w-[25rem]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter confirm password"
                className="form-input mt-1 p-2 border-none outline-none rounded-2xl w-[25rem]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-5">
              <button
                type="submit"
                className="bg-blue-500 py-2  text-white px-4 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
              <Link
                to="/user-order"
                className="bg-rose-500 py-2 text-white px-4 rounded-lg hover:bg-rose-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
