import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
 
const Unauthorized = ({ delay = 5000 }) => {
  console.log("unauthorized");
  const navigate = useNavigate();
  const location = useLocation();
 
  const redirectTo = location.state?.redirectTo || "/login";
  console.log("redirect", redirectTo);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);
 
    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);
 
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f0e0c]">
      <p className="text-xs text-[#c9a84c] uppercase tracking-[0.3em] mb-4">Access Denied</p>
      <h1 className="text-6xl font-bold text-[#e8dfc8] mb-4">403</h1>
      <p className="text-base text-[#7a7060] mb-2">You don't have permission to access this page.</p>
      <p className="text-xs text-[#5a5448] uppercase tracking-widest mt-2">Redirecting...</p>
    </div>
  );
};
 
export default Unauthorized;