import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
 
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
 
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/admin-api/users`, { withCredentials: true });
        if (res.status === 200) {
          setUsers(res.data.payload || []);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
 
  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${BASE_URL}/admin-api/users/${userId}`, { withCredentials: true });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };
 
  if (loading) return <p className="text-center text-[#7a7060] py-10">Loading users...</p>;
  if (error) return <p className="text-center text-[#c95f5f] py-10">{error}</p>;
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-6xl mx-auto px-6 py-10">
 
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-[#c9a84c] rounded-full" />
          <h2 className="text-sm font-semibold text-[#e8dfc8] uppercase tracking-wider">All Users</h2>
        </div>
 
        {users.length === 0 ? (
          <p className="text-[#7a7060] text-center py-10">No users found</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-[#1a1814] border border-[#2e2b25] rounded-xl p-5 hover:border-[#c9a84c]/30 transition flex flex-col items-center text-center gap-3"
              >
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="user"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#c9a84c]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-xl text-[#c9a84c] font-semibold">
                    {user.firstName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
 
                <p className="font-semibold text-[#e8dfc8]">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-[#7a7060]">{user.email}</p>
                <p className="text-xs text-[#c9a84c]/60 uppercase tracking-wider">Role: {user.role}</p>
 
                <button
                  className="text-[#c95f5f] text-xs border border-[#8b3a3a]/30 px-4 py-1.5 rounded-lg hover:bg-[#8b3a3a]/20 hover:text-[#e07070] transition"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        )}
 
      </div>
    </div>
  );
}
 
export default UsersList;