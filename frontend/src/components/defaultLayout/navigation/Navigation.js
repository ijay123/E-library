import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../redux/action/user";
import { logout } from "../../../redux/action/user";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;

  const navigate = useNavigate();
  const {
    allUsers: { users },
  } = useSelector((state) => state);

  console.log(users, "users");

  console.log(userInfoFromLocalStorage, "user from localStorage");

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch, users]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to login page after logging out
  };

  const [bar, setBar] = useState(false);

  return (
    <div className={styles.nav}>
      <div className="font-thin">
        <img src="/images/book4.png" className="w-[40px]" alt="" />
        E-Library
      </div>
      <div className={styles.main}>
        <Link to={"/home"} className="focus:text-[grey]">Home</Link>
        <Link to={"/books"} className="focus:text-[grey]">Books</Link>
        <Link to={"/category"} className="focus:text-[grey]">Category</Link>
        <Link to={"/contact"} className="focus:text-[grey]">Contact</Link>
      </div>
      <div className={styles.left}>
        <input placeholder="Search" />

        <span onClick={handleLogout}>log out</span>
        <div className={styles.profile}>
          <img
            className="w-[35px] rounded-[50%]"
            src={userInfoFromLocalStorage?.data?.avatar}
            alt="User Avatar"
          />
        </div>
      </div>
      <div className={styles.menubar} onClick={()=> setBar(!bar)}>Menu</div>

{bar &&
 <div className="sm:hidden absolute right-0 top-[110px] bg-[grey] px-[30px] py-[20px] flex flex-col">
 <Link to={"/home"} className="focus:text-[green]">Home</Link>
   <Link to={"/books"} className="focus:text-[green]">Books</Link>
   <Link to={"/category"} className="focus:text-[green]">Category</Link>
   <Link to={"/contact"} className="focus:text-[green]">Contact</Link>
   <div className={styles.profile}>
     <img
       className="w-[35px] rounded-[50%]"
       src={userInfoFromLocalStorage?.data?.avatar}
       alt="User Avatar"
     /> My Account
   </div>
   <span onClick={handleLogout}>log out</span>
 </div>
}
     
    </div>
  );
};

export default Navigation;
