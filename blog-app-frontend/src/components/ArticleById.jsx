import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../stores/authStore";
import { useForm } from "react-hook-form";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
} from "../styles/common.js";
 
function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const user = useAuth((state) => state.currentUser);
  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
 
  useEffect(() => {
    if (article) return;
    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/user-api/article/${id}`, { withCredentials: true });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);
 
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
 
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    if (!window.confirm(newStatus ? "Restore this article?" : "Delete this article?")) return;
    try {
      const res = await axios.patch(
        `${BASE_URL}/author-api/articles`,
        { articleId: article._id, isArticleActive: newStatus },
        { withCredentials: true }
      );
      setArticle(res.data.payload);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };
 
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };
 
  const addComment = async (commentObj) => {
    commentObj.articleId = article._id;
    try {
      const res = await axios.put(`${BASE_URL}/user-api/articles`, commentObj, { withCredentials: true });
      if (res.status === 200) {
        setArticle(res.data.payload);
      }
    } catch (err) {
      setError("Failed to add comment");
    }
  };
 
  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-3xl mx-auto px-6 py-14">
 
        {/* HEADER */}
        <div className="mb-10">
          <span className="text-xs text-[#c9a84c] uppercase tracking-widest font-medium">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold text-[#e8dfc8] mt-3 mb-5 leading-tight uppercase">
            {article.title}
          </h1>
          <div className="flex justify-between items-center text-sm text-[#7a7060] border-y border-[#2e2b25] py-3">
            <span>✍️ {user?.role}</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
 
        {/* CONTENT */}
        <div className="text-[#c2b89a] leading-relaxed text-base mb-10 whitespace-pre-line">
          {article.content}
        </div>
 
        {/* AUTHOR ACTIONS */}
        {user?.role === "AUTHOR" && (
          <div className="flex gap-3 mb-10">
            <button
              className="border border-[#c9a84c]/40 text-[#c9a84c] px-5 py-2 rounded-lg text-sm hover:bg-[#c9a84c]/10 transition"
              onClick={() => editArticle(article)}
            >
              Edit
            </button>
            <button
              className="border border-[#8b3a3a]/40 text-[#c95f5f] px-5 py-2 rounded-lg text-sm hover:bg-[#8b3a3a]/20 transition"
              onClick={toggleArticleStatus}
            >
              {article.isArticleActive ? "Delete" : "Restore"}
            </button>
          </div>
        )}
 
        {/* COMMENT FORM */}
        {user?.role === "USER" && (
          <div className="mb-10">
            <form onSubmit={handleSubmit(addComment)} className="flex flex-col gap-3">
              <input
                type="text"
                {...register("comment")}
                className="bg-[#1a1814] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
                placeholder="Write your comment here..."
              />
              <button className="self-start bg-[#c9a84c] text-[#0f0e0c] text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#e8c96a] transition">
                Add comment
              </button>
            </form>
          </div>
        )}
 
        {/* COMMENTS */}
        <div className="space-y-4">
          {article.comments?.length === 0 && (
            <p className="text-[#5a5448] text-sm text-center py-6">No comments yet</p>
          )}
          {article.comments?.map((commentObj, index) => {
            const name = commentObj.user?.email || "User";
            const firstLetter = name.charAt(0).toUpperCase();
            return (
              <div key={index} className="bg-[#1a1814] border border-[#2e2b25] rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-sm text-[#c9a84c] font-semibold">
                    {firstLetter}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#e8dfc8]">{name}</p>
                    <p className="text-xs text-[#5a5448]">{formatDate(commentObj.createdAt || new Date())}</p>
                  </div>
                </div>
                <p className="text-sm text-[#a89070]">{commentObj.comment}</p>
              </div>
            );
          })}
        </div>
 
        {/* FOOTER */}
        <p className="text-xs text-[#5a5448] mt-10 pt-6 border-t border-[#2e2b25]">
          Last updated: {formatDate(article.updatedAt)}
        </p>
      </div>
    </div>
  );
}
 
export default ArticleByID;