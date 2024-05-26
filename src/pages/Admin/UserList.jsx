import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import {
  useDeletedUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  
  const [deleteUser] = useDeletedUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUsername, setEditableUsername] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");



  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Oops something is wrong...");
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserEmail(email)
    setEditableUserId(id)
    setEditableUsername(username)
  }

  const updateHandler = async (id) => {
    try {
        await updateUser({
            userId: id,
            username: editableUsername,
            email: editableUserEmail
        })
        setEditableUserId(null)
        refetch()
    } catch (error) {
        toast.error(error?.data?.message || "Oopsie yr!")
    }
  }

  return (
    <div className="p-4 pl-16 text-white">
      <h1 className="font-semibold text-2xl mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message || "Oopsiee..."}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Admin menu */}
          <table className="w-full md:4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUsername}
                          onChange={(e) => setEditableUsername(e.target.value)}
                          className="text-black w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-pink-500 px-4 py-2 text-white rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="text-black w-full p-2 rounded-lg border"
                        />
                        <button
                         onClick={() => updateHandler(user._id)}
                          className="ml-2 py-2 px-4 text-white bg-yellow-500 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          className="rounded-lg px-4 py-2 bg-red-400 hover:bg-red-700 text-white font-semibold"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
