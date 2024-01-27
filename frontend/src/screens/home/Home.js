import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Snowfall from "react-snowfall";
import { ImLibrary } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import catData from "../../data/database/categoryData";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../redux/action/books";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
    getCategories: { categories },
  } = useSelector((state) => state);

  console.log(books, "books");

  useEffect(() => {
    dispatch(getBooksAction());
  }, [dispatch]);
  return (
    <>
      <div className={styles.home}>
        <h1 className={styles.home1}>
          Welcome to <span className={styles.lib}>E-Library</span>
        </h1>
        <h3 className={styles.fun}>Reading is fun!</h3>
        <div className={styles.icon1}>
          <ImLibrary />
        </div>
        <p className={styles.text1}>
          We offer you the best and latest e-books.
        </p>
        <div className={styles.bookicon}>
          <IoBookSharp />
        </div>
        <p className={styles.text2}>Books are Categorized for easy search</p>
      </div>{" "}
      <Snowfall color="blue" snowflakeCount={60} />
      <Snowfall color="red" snowflakeCount={60} />
      <p className={styles.explore}>Explore our books</p>
      <div className={styles.main}>
        {books &&
          books.slice(0, 4).map((books, id) => (
            <div className={styles.book} key={id}>
              <img src={books.bookImage} alt="" />
            </div>
          ))}
      </div>
     <Link to={'/books'}> <button className={styles.more}>More</button></Link>
      {/* categories */}
      <div>
        <p className={styles.ecat}> Explore The Categories</p>

        <div className={styles.cat1}>
          {catData.map((cat) => (
            <div className={styles.cat}>
              <img src={cat.catImg} alt="" />
              <p className={styles.tex}>{cat.text}</p>
            </div>
          ))}
        </div>
        <button className={styles.more}>More</button>
      </div>
    </>
  );
};

export default Home;
