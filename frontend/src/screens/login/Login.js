import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { loginImg1 } from "../../data";
import { toast } from "react-toastify";
import { loginUserAction } from "../../redux/action/user";
import { LOGIN_USER_CLEAR_ERROR } from "../../redux/constants/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Spinner/CustomSpinner";

const Login = () => {
  const dispatch = useDispatch();

  const {
    loggedInUser: { error, user, success, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;
  console.log(user);

  const [value, setValue] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  function changeHandler(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (success) {
      toast.success(
        `You have successfully logged in, ${userInfoFromLocalStorage?.data?.FirstName}`
      );

      const role = userInfoFromLocalStorage?.data?.role || ""; // Default to an empty string if role is not available
      console.log(role, "role");
      setTimeout(() => {
        switch (role) {
          case "regular":
            navigate("/home");
            break;
          case "admin":
            navigate("/dashboard");
            break;
          default:
            navigate("/");
            break;
        }
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(LOGIN_USER_CLEAR_ERROR);
      }, 3000);
    }
  }, [
    success,
    error,
    dispatch,
    user,
    navigate,
    userInfoFromLocalStorage?.data?.role,
    userInfoFromLocalStorage?.data?.FirstName,
  ]);

  async function LoginHandler() {
    dispatch(
      loginUserAction({
        email: value.email,
        password: value.password,
      })
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.img1}>
        <img src={loginImg1} alt="" className="" />
      </div>
      <div className={styles.main2}>
        <div className="font-thin sm:float-right  flex flex-col justify-center items-center">
          <img
            src="/images/book4.png"
            className="sm:w-[40px] w-[25px] "
            alt=""
          />
          E-Library
        </div>
        <form className={styles.form}>
          <p className="sm:text-[30px] font-bold pb-[40px]">
            Login Into Account
          </p>
          <p>EMAIL</p>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Email"
          />
          <br />
          <p>PASSWORD</p>
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            placeholder="Password"
          />
          <br />
          {loading ? (
            <Spinner />
          ) : (
            <button onClick={LoginHandler} className={styles.btn1}>
              LOGIN
            </button>
          )}

          <br />
          <div className={styles.text}>
            You don't have an Account?{" "}
            <Link to={"/"} className={styles.login}>
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
