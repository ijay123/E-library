import React, { useState, useEffect } from "react";
import { SignupImg } from "../../data";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createUserAction } from "../../redux/action/user";
import { CREATE_USER_CLEAR_ERROR } from "../../redux/constants/user";
import Spinner from "../../Spinner/CustomSpinner";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    createdUser: { error, user, success, loading },
  } = useSelector((state) => state);

  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
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
      toast.success(`welcome${user.username}`);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_USER_CLEAR_ERROR);
      }, 3000);
    }
  }, [dispatch, error, user, success]);

  // async function LoginHandler() {
  //   dispatch(loginUserAction({ email: value.email, password: value.password }));
  // }

  async function RegisterHandler() {
    dispatch(
      createUserAction({
        username: value.username,
        email: value.email,
        password: value.password,
      })
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.img1}>
        <img src={SignupImg} alt="" />
      </div>
      <div className={styles.main2}>
        <form className={styles.form}>
          <p>USERNAME</p>
          <input
            onChange={changeHandler}
            type="text"
            name="username"
            placeholder="Username"
          />
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
            <button type="submit" onClick={RegisterHandler} className={styles.btn1}>
              SIGNUP
            </button>
          )}

          <br />
          <p className={styles.text}>
            Already have an Account? <Link to={'/login'} className={styles.login}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
