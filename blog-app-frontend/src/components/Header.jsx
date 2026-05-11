import { NavLink } from "react-router";
import { useAuth } from "../stores/authStore";
 
function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
 
  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR": return "/author-profile";
      case "ADMIN": return "/admin-profile";
      default: return "/user-profile";
    }
  };
 
  return (
    <nav className="bg-[#1a1814] border-b border-[#2e2b25] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
 
        {/* LOGO */}
        <NavLink to="/" className="text-xl font-bold text-[#c9a84c] tracking-widest uppercase">
          MyBlog
        </NavLink>
 
        {/* NAV */}
        <ul className="flex items-center gap-6 text-xs font-medium uppercase tracking-wider">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-[#c9a84c] border-b border-[#c9a84c] pb-0.5"
                  : "text-[#7a7060] hover:text-[#c9a84c] transition"
              }
            >
              Home
            </NavLink>
          </li>
 
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#c9a84c] border-b border-[#c9a84c] pb-0.5"
                      : "text-[#7a7060] hover:text-[#c9a84c] transition"
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="bg-[#c9a84c] text-[#0f0e0c] font-semibold px-4 py-1.5 rounded-lg hover:bg-[#e8c96a] transition"
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
 
          {isAuthenticated && (
            <li className="flex items-center gap-3">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border border-[#c9a84c]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-sm text-[#c9a84c] font-semibold">
                  {user?.firstName?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <NavLink
                to={getProfilePath()}
                className="text-[#a89070] hover:text-[#c9a84c] transition"
              >
                {user?.firstName || "Profile"}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
 
export default Header;