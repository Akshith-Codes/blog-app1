import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
 
function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
 
  const onLogout = async () => {
    await logout();
    navigate("/login");
  };
 
  return (
    <div className="min-h-screen bg-[#0f0e0c]">
      <div className="max-w-5xl mx-auto px-6 py-10">
 
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
              <p className="text-xs text-[#c9a84c]/70 uppercase tracking-wider mt-0.5">Author Dashboard</p>
            </div>
          </div>
 
          <button
            className="border border-[#8b3a3a]/40 text-[#c95f5f] text-sm px-5 py-2 rounded-lg hover:bg-[#8b3a3a]/20 transition"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
 
        {/* NAV TABS */}
        <div className="flex gap-2 mb-8 bg-[#1a1814] border border-[#2e2b25] p-1.5 rounded-xl w-fit">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive
                ? "bg-[#c9a84c] text-[#0f0e0c] font-semibold px-5 py-2 rounded-lg text-sm transition"
                : "text-[#7a7060] px-5 py-2 text-sm hover:text-[#c9a84c] transition"
            }
          >
            Articles
          </NavLink>
          <NavLink
            to="write-article"
            className={({ isActive }) =>
              isActive
                ? "bg-[#c9a84c] text-[#0f0e0c] font-semibold px-5 py-2 rounded-lg text-sm transition"
                : "text-[#7a7060] px-5 py-2 text-sm hover:text-[#c9a84c] transition"
            }
          >
            Write Article
          </NavLink>
        </div>
 
        {/* CONTENT */}
        <div className="bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-6">
          <Outlet />
        </div>
 
      </div>
    </div>
  );
}
 
export default AuthorProfile;