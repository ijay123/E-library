import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "./AdminLayout";
import Layout from "../../components/defaultLayout/layout/Layout";
export const AdminProtectedRoute = ({ children }) => {
  const loginUser = useSelector((state) => state.loggedInUser);
  console.log(loginUser, "loginUser");
  if (!loginUser) {
    // Redirect to login if user is not logged in
    return <Navigate to="/login" />;
  }

  const {
    user: { data },
  } = loginUser;
  console.log(data.role, "role protectedroute");
  if (data.role === "admin") {
    // Render the AdminLayout for admin users
    return <AdminLayout>{children}</AdminLayout>;
  } else if (data.role === "regular") {
    // Render the regular Layout for regular users
    return <Layout>{children}</Layout>;
  }
 else {
    // Redirect to the default route if the role is neither admin nor regular
    return <Navigate to="/" />;
  }
};
