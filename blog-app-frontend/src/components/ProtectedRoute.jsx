import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router";
import { toast } from "react-hot-toast";
 
function ProtectedRoute({ children, allowedRoles }) {
  const { loading, currentUser, isAuthenticated } = useAuth();
 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0e0c]">
        <p className="text-xs text-[#7a7060] uppercase tracking-widest">Loading...</p>
      </div>
    );
  }
 
  if (!isAuthenticated) {
    toast.error("Redirecting to Login");
    return <Navigate to="/login" replace />;
  }
 
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />;
  }
 
  return children;
}
 
export default ProtectedRoute;