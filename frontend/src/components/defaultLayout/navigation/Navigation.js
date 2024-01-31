import React, { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../redux/action/user";

const Navigation = () => {
  const dispatch = useDispatch();

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;

  const {
    singleUser: { user },
  } = useSelector((state) => state);

  console.log(user, "user");

  useEffect(() => {
    const userId = userInfoFromLocalStorage._id
    dispatch(getUserAction(userId));
  }, [dispatch]);

  return (
    <div className={styles.nav}>
      <div>LOGO</div>
      <div className={styles.main}>
        <Link to={"/home"}>Home</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/category"}>Category</Link>
        <Link to={"/about"}>About Us</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
      <div className={styles.left}>
        <input placeholder="Search" />

        <Link to={"/"}>Signup</Link>
        <Link to={"/login"}>Login</Link>
        <div className={styles.profile}>
    
          <img src={userInfoFromLocalStorage.avatar} alt="" />
        </div>
      </div>
      <div className={styles.menubar}>Menu</div>
    </div>
  );
};

export default Navigation;
