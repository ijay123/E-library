import React from "react";
import AdminNavigation from "../navigation/Navigation";



const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNavigation />
   
      <div>{children}</div>


    </div>
  );
};

export default AdminLayout;
