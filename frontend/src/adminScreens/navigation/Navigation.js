import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/action/user";
import { useDispatch } from "react-redux";

const AdminNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;
  return (
    <div className="w-[100%] z-[10] text-[20px] text-[red] px-[70px] h-[5vw] fixed flex items-center justify-between bg-white">
      <span>LOGO</span>
      <Link to={"/adminHome"}>Dashboard</Link>
      <span onClick={handleLogout}>Logout</span>
      <img
        src={userInfoFromLocalStorage?.data?.avatar}
        className="w-[35px] rounded-[50%]"
        alt=""
      />
    </div>
  );
};

export default AdminNavigation;
