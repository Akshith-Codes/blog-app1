import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
 
function EditArticle() {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
 
  useEffect(() => {
    if (!article) return;
    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);
 
  useEffect(() => {
    if (!article) navigate("/");
  }, [article, navigate]);
 
  const updateArticle = async (modifiedArticle) => {
    try {
      modifiedArticle.articleId = article._id;
      const res = await axios.put(
        `${BASE_URL}/author-api/articles`,
        modifiedArticle,
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate(`/article/${article._id}`, { state: res.data.payload });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-3xl mx-auto px-6 py-14">
 
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs text-[#c9a84c] uppercase tracking-[0.3em] mb-2">Edit Post</p>
          <h2 className="text-3xl font-bold text-[#e8dfc8]">Edit Article</h2>
          <p className="text-[#7a7060] text-sm mt-2">Update your article below</p>
        </div>
 
        {/* FORM */}
        <div className="bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit(updateArticle)} className="space-y-6">
 
            {/* Title */}
            <div>
              <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
                {...register("title", { required: "Title is required" })}
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
                <option value="">Select category</option>
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
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && <p className="text-[#c95f5f] text-xs mt-1.5">{errors.content.message}</p>}
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#c9a84c] text-[#0f0e0c] font-semibold py-3 rounded-lg hover:bg-[#e8c96a] transition text-sm"
            >
              Update Article
            </button>
 
          </form>
        </div>
 
      </div>
    </div>
  );
}
 
export default EditArticle
