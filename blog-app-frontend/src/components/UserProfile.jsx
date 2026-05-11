import { useAuth } from "../stores/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
 
function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
 
  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/user-api/articles`, { withCredentials: true });
        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);
 
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
 
  const onLogout = async () => {
    await logout();
    navigate("/login");
  };
 
  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };
 
  if (loading) {
    return <p className="text-center text-[#7a7060] py-10">Loading articles...</p>;
  }
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-5xl mx-auto px-6 py-10">
 
        {/* ERROR */}
        {error && <p className="text-[#c95f5f] text-sm text-center mb-6">{error}</p>}
 
        {/* PROFILE HEADER */}
        <div className="bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-6 mb-10 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            {currentUser?.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#c9a84c]"
                alt="profile"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-xl text-[#c9a84c] font-semibold">
                {currentUser?.firstName?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-xs text-[#7a7060] uppercase tracking-widest mb-0.5">Welcome back</p>
              <h2 className="text-xl font-semibold text-[#e8dfc8]">{currentUser?.firstName}</h2>
            </div>
          </div>
 
          <button
            className="border border-[#8b3a3a]/40 text-[#c95f5f] text-sm px-5 py-2 rounded-lg hover:bg-[#8b3a3a]/20 transition"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
 
        {/* ARTICLES */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-5 bg-[#c9a84c] rounded-full" />
            <h3 className="text-sm font-semibold text-[#e8dfc8] uppercase tracking-wider">
              Latest Articles
            </h3>
          </div>
 
          {articles.length === 0 ? (
            <div className="text-center py-16 text-[#5a5448]">
              <p className="text-lg">📭 No articles yet</p>
              <p className="text-sm mt-1">Explore content from authors</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-[#1a1814] border border-[#2e2b25] rounded-xl p-5 hover:border-[#c9a84c]/40 transition duration-300 flex flex-col group"
                >
                  <p className="text-base font-semibold text-[#e8dfc8] leading-snug group-hover:text-[#c9a84c] transition">
                    {article.title}
                  </p>
                  <p className="text-sm text-[#7a7060] mt-2 flex-1">
                    {article.content?.slice(0, 80)}...
                  </p>
                  <p className="text-xs text-[#5a5448] mt-2">{formatDateIST(article.createdAt)}</p>
                  <button
                    className="text-[#c9a84c] hover:text-[#e8c96a] text-sm font-medium mt-4 pt-4 border-t border-[#2e2b25] text-left transition"
                    onClick={() => openArticle(article)}
                  >
                    Read →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
 
      </div>
    </div>
  );
}
 
export default UserProfile;