import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, editUser, toggleBlockUser, deleteUser } from "../Redux/Admin/Admin-UsersSlice";
import { AppDispatch, RootState } from "../Redux/Store";

function AdminUsers() {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.adminUsers);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlockToggle = (userId: string, isBlocked: number) => {
    if (window.confirm(`Are you sure you want to ${isBlocked ? "block" : "unblock"} this user?`)) {
      dispatch(toggleBlockUser({ id: userId, isBlocked }));
    }
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-users">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">
                <img src={user.profilePicture} alt={user.userName} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="border px-4 py-2">{user.userName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.isBlocked ? "Blocked" : "Active"}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleBlockToggle(user._id, user.isBlocked ? 0 : 1)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                {/* <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button> */}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
