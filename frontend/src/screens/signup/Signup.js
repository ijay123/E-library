import React, { useState, useEffect } from "react";
import { SignupImg } from "../../data";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createUserAction } from "../../redux/action/user";
import { CREATE_USER_CLEAR_ERROR, CREATE_USER_RESET } from "../../redux/constants/user";
import Spinner from "../../Spinner/CustomSpinner";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    createdUser: { error, success, loading },
  } = useSelector((state) => state);
  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;

  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (success) {
      toast.success(`welcome ${userInfoFromLocalStorage?.data?.FirstName}`);
      setTimeout(() => {
        dispatch({type: CREATE_USER_RESET});
      }, 3000);
    }
    

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({type: CREATE_USER_CLEAR_ERROR});
      }, 3000);
    }
  }, [dispatch, error, success, userInfoFromLocalStorage?.data?.FirstName]);

  // async function LoginHandler() {
  //   dispatch(loginUserAction({ email: value.email, password: value.password }));
  // }

  async function RegisterHandler() {
    dispatch(
      createUserAction({
        username: value.username,
        email: value.email,
        password: value.password,
        gender: value.gender,
      })
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.img1}>
        <img src={SignupImg} alt="" />
      </div>
      <div className={styles.main2}>
        <div className="font-thin float-right">
          <img src="/images/book4.png" className="w-[40px]" alt="" />
          E-Library
        </div>
        <form className={styles.form}>
          <p className="text-[30px] font-bold pb-[40px]">Create Account</p>
          <p>USERNAME</p>
          <input
            onChange={changeHandler}
            type="text"
            name="username"
            placeholder="Username"
          />
          <br />
          <p>GENDER</p>
          <select
            onChange={changeHandler}
            name="gender"
            className="sm:mb-[50px] border text-[black] bg-[#d0cdcd] border-[red] w-[77vw] flex m-auto sm:w-[100%] px-[20px] py-[10px] rounded-[10px] outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <p>EMAIL</p>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            placeholder="Email"
          />
          <br />
          <p>PASSWORD</p>
          <input
            onChange={changeHandler}
            type="password"
            name="password"
            placeholder="Password"
          />
          <br />
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              onClick={RegisterHandler}
              className={styles.btn1}
            >
              SIGNUP
            </button>
          )}

          <br />
          <p className={styles.text}>
            Already have an Account?{" "}
            <Link to={"/login"} className={styles.login}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
