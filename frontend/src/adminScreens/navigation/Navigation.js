import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation = () => {

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
  ? JSON.parse(localStorage.getItem("libraryUserInfo"))
  : null;
  return (
    <div className="w-[100%] z-[10] text-[20px] text-[red] px-[70px] h-[5vw] fixed flex items-center justify-between bg-white">
      <span>LOGO</span>
      <Link to={"/adminHome"}>Dashboard</Link>
      <Link to={"/login"}>Login</Link>
      <img src={userInfoFromLocalStorage?.data?.avatar} className="w-[35px] rounded-[50%]" alt=""/>
    </div>
  );
};

export default AdminNavigation;
