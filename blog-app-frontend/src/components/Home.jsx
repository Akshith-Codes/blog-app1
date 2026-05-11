import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
 
function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
 
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/user-api/articles`, { withCredentials: true });
        if (res.status === 200) {
          setArticles((res.data.payload || []).slice(0, 4));
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
 
  const openArticle = (article) => {
    if (!article?._id) return;
    navigate(`/article/${article._id}`, { state: article });
  };
 
  const goToAllArticles = () => {
    navigate("/user-profile");
  };
 
  if (loading)
    return <p className="text-center text-[#7a7060] py-10">Loading...</p>;
 
  if (error)
    return <p className="text-center text-[#c95f5f] py-10">{error}</p>;
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-6xl mx-auto px-6 py-14">
 
        {/* HERO */}
        <div className="text-center mb-20">
          <p className="text-xs text-[#c9a84c] uppercase tracking-[0.3em] mb-4">Est. 2024</p>
          <h1 className="text-5xl font-bold text-[#e8dfc8] mb-5 leading-tight">
            Welcome to <span className="text-[#c9a84c]">MyBlog</span>
          </h1>
          <p className="text-[#7a7060] max-w-md mx-auto text-base leading-relaxed">
            Discover insightful articles on technology, programming, AI, and more.
          </p>
          <button
            onClick={goToAllArticles}
            className="mt-8 bg-[#c9a84c] text-[#0f0e0c] font-semibold text-sm px-7 py-3 rounded-lg hover:bg-[#e8c96a] transition"
          >
            Explore Articles
          </button>
        </div>
 
        {/* ARTICLES */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-[#c9a84c] rounded-full" />
              <h2 className="text-base font-semibold text-[#e8dfc8] uppercase tracking-wider">
                Latest Articles
              </h2>
            </div>
            <button
              onClick={goToAllArticles}
              className="text-xs text-[#c9a84c] hover:text-[#e8c96a] uppercase tracking-wider transition"
            >
              View All →
            </button>
          </div>
 
          {articles.length === 0 ? (
            <div className="text-center py-16 text-[#5a5448]">
              <p className="text-lg">📭 No articles yet</p>
              <p className="text-sm mt-1">Be the first to explore content</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-[#1a1814] border border-[#2e2b25] rounded-xl p-5 hover:border-[#c9a84c]/40 transition duration-300 flex flex-col group"
                >
                  <p className="text-xs text-[#c9a84c] mb-2 capitalize tracking-wider">
                    {article.category}
                  </p>
                  <p className="text-base font-semibold text-[#e8dfc8] leading-snug group-hover:text-[#c9a84c] transition">
                    {article.title}
                  </p>
                  <p className="text-sm text-[#7a7060] mt-2 flex-1">
                    {article.content?.slice(0, 80) || "No content"}...
                  </p>
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
 
export default Home;