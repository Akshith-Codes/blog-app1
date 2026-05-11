import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";
 
function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const { login, currentUser, loading, error, isAuthenticated } = useAuth((state) => state);
 
  const onUserLogin = (userCredObj) => {
    login(userCredObj);
  };
 
  console.log("current user ", currentUser);
 
  useEffect(() => {
    if (isAuthenticated === true) {
      if (currentUser.role === "USER") navigate("/user-profile");
      if (currentUser.role === "AUTHOR") navigate("/author-profile");
      if (currentUser.role === "ADMIN") navigate("/admin-profile");
    }
  }, [isAuthenticated]);
 
  console.log(isAuthenticated, currentUser);
 
  if (loading) {
    return <p className="text-center text-[#7a7060] py-10">Loading...</p>;
  }
 
  return (
    <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-8 shadow-2xl">
 
        <h2 className="text-2xl font-bold text-[#e8dfc8] mb-1">Sign In</h2>
        <p className="text-xs text-[#7a7060] mb-8 uppercase tracking-widest">Welcome back</p>
 
        {error && <p className="text-[#c95f5f] text-sm mb-5">{error}</p>}
 
        <form onSubmit={handleSubmit(onUserLogin)}>
 
          <div className="mb-5">
            <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
              {...register("email", {
                required: "Email is required",
                validate: (value) => value.trim().length > 0 || "Email cannot be empty",
              })}
            />
            {errors.email && <p className="text-[#c95f5f] text-xs mt-1.5">{errors.email.message}</p>}
          </div>
 
          <div className="mb-2">
            <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
              {...register("password", {
                required: "Password is required",
                validate: (value) => value.trim().length > 0 || "Password cannot be empty",
              })}
            />
            {errors.password && <p className="text-[#c95f5f] text-xs mt-1.5">{errors.password.message}</p>}
          </div>
 
          <div className="text-right mb-6">
            <a href="/forgot-password" className="text-xs text-[#7a7060] hover:text-[#c9a84c] transition">
              Forgot password?
            </a>
          </div>
 
          <button
            type="submit"
            className="w-full bg-[#c9a84c] text-[#0f0e0c] font-semibold py-3 rounded-lg hover:bg-[#e8c96a] transition text-sm"
          >
            Sign In
          </button>
        </form>
 
        <p className="text-center text-[#7a7060] text-sm mt-6">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-[#c9a84c] hover:text-[#e8c96a] transition">
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}
 
export default Login;
 