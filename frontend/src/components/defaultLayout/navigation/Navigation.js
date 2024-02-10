import React, { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../redux/action/user";

const Navigation = () => {
  const dispatch = useDispatch();

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;

  const {
    allUsers: { users },
  } = useSelector((state) => state);

  console.log(users, "users");


  console.log(userInfoFromLocalStorage, "user from localStorage");

  useEffect(() => {
  
      dispatch(getUsersAction());

  }, [dispatch, users]);

  return (
    <div className={styles.nav}>
      <div className="font-thin">
        <img src="/images/book4.png" className="w-[40px]" alt="" />
        E-Library
      </div>
      <div className={styles.main}>
        <Link to={"/home"}>Home</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/category"}>Category</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
      <div className={styles.left}>
        <input placeholder="Search" />

        <Link to={"/"}>Signup</Link>
        <Link to={"/login"}>Login</Link>
        <div className={styles.profile}>
          <img className="w-[35px] rounded-[50%]" src={userInfoFromLocalStorage?.data?.avatar} alt="User Avatar" />
        </div>
      </div>
      <div className={styles.menubar}>Menu</div>
    </div>
  );
};

export default Navigation;
