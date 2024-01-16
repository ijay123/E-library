import React from "react";
import AdminNavigation from "../navigation/Navigation";

import Footer from "../../components/defaultLayout/footer/Footer";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNavigation />
   
      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
