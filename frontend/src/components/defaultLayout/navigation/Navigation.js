import React from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.nav}>
      <div>LOGO</div>
      <div className={styles.main}>
        <Link to={"/home"}>Home</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/category"}>Category</Link>
        <Link to={"/blogs"}>Blogs</Link>
      </div>
      <div className={styles.left}>
        <input placeholder="Search"/>
        <div  className={styles.profile} ><CiUser/></div>
        <Link to={'/'}>Signup</Link>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default Navigation;
