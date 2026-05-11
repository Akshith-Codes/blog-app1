import {
  divider,
  errorClass,
  formCard,
  formGroup,
  formTitle,
  inputClass,
  labelClass,
  pageBackground,
  submitBtn,
  mutedText,
} from "../styles/common";
 
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
 
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
 
  const onUserRegister = async (userObj) => {
    try {
      setLoading(true);
      setApiError(null);
      const formData = new FormData();
      formData.append("role", userObj.role);
      formData.append("firstName", userObj.firstName);
      formData.append("lastName", userObj.lastName || "");
      formData.append("email", userObj.email);
      formData.append("password", userObj.password);
      if (userObj.profileImageUrl?.[0]) {
        formData.append("profileImageUrl", userObj.profileImageUrl[0]);
      }
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const res = await axios.post(`${BASE_URL}/auth/users`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration error:", err);
      setApiError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-8 shadow-2xl">
 
        <h2 className="text-2xl font-bold text-[#e8dfc8] mb-1">Create an Account</h2>
        <p className="text-xs text-[#7a7060] mb-7 uppercase tracking-widest">Join MyBlog today</p>
 
        {apiError && <p className="text-[#c95f5f] text-sm mb-5">{apiError}</p>}
 
        <form onSubmit={handleSubmit(onUserRegister)}>
 
          {/* ROLE */}
          <div className="mb-6">
            <p className="text-xs text-[#c9a84c] uppercase tracking-widest mb-3">Register as</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-[#a89070] text-sm cursor-pointer">
                <input type="radio" value="USER" {...register("role", { required: "Select role" })} className="accent-[#c9a84c]" />
                <span>User</span>
              </label>
              <label className="flex items-center gap-2 text-[#a89070] text-sm cursor-pointer">
                <input type="radio" value="AUTHOR" {...register("role", { required: "Select role" })} className="accent-[#c9a84c]" />
                <span>Author</span>
              </label>
            </div>
            {errors.role && <p className="text-[#c95f5f] text-xs mt-2">{errors.role.message}</p>}
          </div>
 
          <div className="h-px bg-[#2e2b25] mb-6" />
 
          {/* NAME */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">First Name</label>
              <input
                className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
                {...register("firstName", { required: "First name required" })}
              />
              {errors.firstName && <p className="text-[#c95f5f] text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Last Name</label>
              <input
                className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
                {...register("lastName")}
              />
            </div>
          </div>
 
          {/* EMAIL */}
          <div className="mb-5">
            <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && <p className="text-[#c95f5f] text-xs mt-1">{errors.email.message}</p>}
          </div>
 
          {/* PASSWORD */}
          <div className="mb-5">
            <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#e8dfc8] placeholder-[#5a5448] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && <p className="text-[#c95f5f] text-xs mt-1">{errors.password.message}</p>}
          </div>
 
          {/* PROFILE IMAGE */}
          <div className="mb-7">
            <label className="block text-xs text-[#7a7060] uppercase tracking-widest mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="w-full bg-[#0f0e0c] border border-[#2e2b25] text-[#7a7060] rounded-lg px-4 py-2.5 text-sm file:mr-3 file:text-xs file:bg-[#c9a84c]/20 file:text-[#c9a84c] file:border-0 file:rounded file:px-3 file:py-1 focus:outline-none"
              {...register("profileImageUrl", {
                validate: {
                  fileType: (files) => {
                    if (!files?.[0]) return true;
                    return ["image/png", "image/jpeg"].includes(files[0].type) || "Only JPG/PNG allowed";
                  },
                  fileSize: (files) => {
                    if (!files?.[0]) return true;
                    return files[0].size <= 2 * 1024 * 1024 || "Max size 2MB";
                  },
                },
              })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
            {errors.profileImageUrl && <p className="text-[#c95f5f] text-xs mt-1">{errors.profileImageUrl.message}</p>}
            {preview && (
              <div className="mt-4 flex justify-center">
                <img src={preview} alt="preview" className="w-20 h-20 rounded-full object-cover border-2 border-[#c9a84c]" />
              </div>
            )}
          </div>
 
          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a84c] text-[#0f0e0c] font-semibold py-3 rounded-lg hover:bg-[#e8c96a] transition text-sm"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
 
        <p className="text-center text-[#7a7060] text-sm mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-[#c9a84c] hover:text-[#e8c96a] transition">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
 
export default Register;
 