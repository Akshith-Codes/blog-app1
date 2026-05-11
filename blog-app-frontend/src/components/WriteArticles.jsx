import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  formCard,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";
import { useAuth } from "../stores/authStore";
 
function WriteArticles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const submitArticle = async (articleObj) => {
    setLoading(true);
    articleObj.author = currentUser._id;
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
      let res = await axios.post(`${BASE_URL}/author-api/article`, articleObj, { withCredentials: true });
      if (res.status === 201) {
        toast.success("Article published successfully");
        navigate("../articles");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-3xl mx-auto px-6 py-14">
 
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs text-[#c9a84c] uppercase tracking-[0.3em] mb-2">New Post</p>
          <h2 className="text-3xl font-bold text-[#e8dfc8]">Write an Article</h2>
          <p className="text-[#7a7060] text-sm mt-2">Share your thoughts with the world</p>
        </div>
 
        {/* FORM */}
        <div className="bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit(submitArticle)} className="space-y-6">
 
            {/* Title */}
            <div>
              <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
                placeholder="Enter article title"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 5, message: "Title must be at least 5 characters" },
                })}
              />
              {errors.title && <p className="text-[#c95f5f] text-xs mt-1.5">{errors.title.message}</p>}
            </div>
 
            {/* Category */}
            <div>
              <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Category</label>
              <select
                className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
                {...register("category", { required: "Category is required" })}
              >
                <option value="" className="text-[#5a5448]">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="ai">AI</option>
                <option value="web-development">Web Development</option>
              </select>
              {errors.category && <p className="text-[#c95f5f] text-xs mt-1.5">{errors.category.message}</p>}
            </div>
 
            {/* Content */}
            <div>
              <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Content</label>
              <textarea
                rows="9"
                className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition resize-none"
                placeholder="Write your article content..."
                {...register("content", {
                  required: "Content is required",
                  minLength: { value: 50, message: "Content must be at least 50 characters" },
                })}
              />
              {errors.content && <p className="text-[#c95f5f] text-xs mt-1.5">{errors.content.message}</p>}
            </div>
 
            {/* Submit */}
            <button
              className="w-full bg-[#c9a84c] text-[#0f0e0c] font-semibold py-3 rounded-lg hover:bg-[#e8c96a] transition text-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Article"}
            </button>
 
            {loading && (
              <p className="text-[#7a7060] text-sm text-center">Publishing article...</p>
            )}
          </form>
        </div>
 
      </div>
    </div>
  );
}
 
export default WriteArticles;