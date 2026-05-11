import { useAuth } from "../stores/authStore";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
} from "../styles/common";
 
function AdminProfile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "https://blog-app1-27ug.onrender.com";
 
  if (!currentUser) {
    return <p className="text-center mt-10 text-[#a89070]">Loading profile...</p>;
  }
 
  if (currentUser.role !== "ADMIN") {
    return <p className="text-center mt-10 text-[#a89070]">Access denied</p>;
  }
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, articlesRes] = await Promise.all([
          axios.get(`${BASE_URL}/admin-api/users`, { withCredentials: true }),
          axios.get(`${BASE_URL}/admin-api/articles`, { withCredentials: true }),
        ]);
        setUsers(usersRes.data.payload || []);
        setArticles(articlesRes.data.payload || []);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  const onLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
 
  const deleteArticle = async (articleId) => {
    if (!window.confirm("Delete this article?")) return;
    try {
      await axios.delete(`${BASE_URL}/admin-api/articles/${articleId}`, {
        withCredentials: true,
      });
      setArticles((prev) => prev.filter((a) => a._id !== articleId));
      toast.success("Article deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };
 
  if (loading) return <p className={loadingClass}>Loading admin data...</p>;
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-6xl mx-auto px-6 py-10">
 
        {/* HEADER */}
        <div className="bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-6 mb-10 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            {currentUser.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#c9a84c]"
                alt="profile"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-xl text-[#c9a84c] font-semibold">
                {currentUser.firstName?.charAt(0)?.toUpperCase() || "A"}
              </div>
            )}
            <div>
              <p className="text-[#7a7060] text-xs uppercase tracking-widest mb-0.5">Admin Panel</p>
              <h2 className="text-xl font-semibold text-[#e8dfc8]">{currentUser.firstName}</h2>
            </div>
          </div>
 
          <button
            onClick={onLogout}
            className="bg-transparent border border-[#8b3a3a] text-[#c95f5f] text-sm px-5 py-2 rounded-lg hover:bg-[#8b3a3a]/20 transition"
          >
            Logout
          </button>
        </div>
 
        {/* ERROR */}
        {error && <p className="text-[#c95f5f] text-sm mb-6 text-center">{error}</p>}
 
        {/* USERS */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-[#2e2b25]" />
            <h3 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-widest">All Users</h3>
            <div className="h-px flex-1 bg-[#2e2b25]" />
          </div>
 
          {users.length === 0 ? (
            <p className="text-[#7a7060] text-center">No users found</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {users.map((user) => (
                <div key={user._id} className="bg-[#1a1814] border border-[#2e2b25] p-4 rounded-xl hover:border-[#c9a84c]/30 transition">
                  <p className="font-medium text-[#e8dfc8]">{user.firstName}</p>
                  <p className="text-sm text-[#7a7060] mt-0.5">{user.email}</p>
                  <p className="text-xs mt-2 text-[#c9a84c]/70 uppercase tracking-wider">Role: {user.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
 
        {/* ARTICLES */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-[#2e2b25]" />
            <h3 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-widest">All Articles</h3>
            <div className="h-px flex-1 bg-[#2e2b25]" />
          </div>
 
          {articles.length === 0 ? (
            <p className="text-[#7a7060] text-center">No articles found</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article._id} className="bg-[#1a1814] border border-[#2e2b25] rounded-xl p-5 hover:border-[#c9a84c]/30 transition flex flex-col">
                  <p className="font-semibold text-[#e8dfc8] text-base leading-snug">{article.title}</p>
                  <p className="text-sm text-[#7a7060] mt-2 flex-1">
                    {article.content?.slice(0, 80)}...
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2e2b25]">
                    <button
                      className="text-[#c9a84c] text-sm hover:text-[#e8c96a] transition"
                      onClick={() => navigate(`/article/${article._id}`, { state: article })}
                    >
                      View →
                    </button>
                    <button
                      className="text-[#c95f5f] text-sm hover:text-[#e07070] transition"
                      onClick={() => deleteArticle(article._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
 
      </div>
    </div>
  );
}
 
export default AdminProfile;
