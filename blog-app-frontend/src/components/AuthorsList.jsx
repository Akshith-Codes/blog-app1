import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
 
import {
  articleCardClass,
  loadingClass,
  errorClass,
  ghostBtn,
} from "../styles/common";
 
function AuthorsList() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
 
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/admin-api/authors`, { withCredentials: true });
        if (res.status === 200) {
          setAuthors(res.data.payload || []);
        }
      } catch (err) {
        console.log(err);
        if (err.response?.status === 401) {
          setError("Only admin can view authors");
        } else {
          setError("Failed to load authors");
        }
      } finally {
        setLoading(false);
      }
    };
 
    fetchAuthors();
  }, [BASE_URL]);
 
  const openAuthor = (author) => {
    if (!author?._id) return;
    navigate(`/author/${author._id}`, { state: author });
  };
 
  if (loading) return <p className="text-center text-[#7a7060] py-10">Loading authors...</p>;
  if (error) return <p className="text-center text-[#c95f5f] py-10">{error}</p>;
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-6xl mx-auto px-6 py-10">
 
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-[#c9a84c] rounded-full" />
          <h2 className="text-sm font-semibold text-[#e8dfc8] uppercase tracking-wider">All Authors</h2>
        </div>
 
        {authors.length === 0 ? (
          <div className="text-center py-16 text-[#5a5448]">
            <p className="text-lg">No authors found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {authors.map((author) => {
              const firstLetter = author.firstName?.charAt(0)?.toUpperCase();
 
              return (
                <div
                  key={author._id}
                  className="bg-[#1a1814] border border-[#2e2b25] rounded-xl p-5 hover:border-[#c9a84c]/30 transition flex flex-col items-center text-center gap-3"
                >
                  {/* Avatar */}
                  {author.profileImageUrl ? (
                    <img
                      src={author.profileImageUrl}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#c9a84c]"
                      alt="author"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-2xl text-[#c9a84c] font-semibold">
                      {firstLetter || "A"}
                    </div>
                  )}
 
                  {/* Name */}
                  <h3 className="text-base font-semibold text-[#e8dfc8]">
                    {author.firstName} {author.lastName}
                  </h3>
 
                  {/* Email */}
                  <p className="text-xs text-[#7a7060]">{author.email}</p>
 
                  {/* Action */}
                  <button
                    className="mt-1 text-xs text-[#c9a84c] border border-[#c9a84c]/30 px-4 py-1.5 rounded-lg hover:bg-[#c9a84c]/10 hover:text-[#e8c96a] transition"
                    onClick={() => openAuthor(author)}
                  >
                    View Articles →
                  </button>
                </div>
              );
            })}
          </div>
        )}
 
      </div>
    </div>
  );
}
 
export default AuthorsList;