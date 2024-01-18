import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <div className="w-[100%] z-[9999] text-[20px] text-[red] px-[70px] h-[5vw] fixed flex items-center justify-between bg-white">
      <span>LOGO</span>
      <Link to={"/adminHome"}>Dashboard</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default AdminNavigation;
