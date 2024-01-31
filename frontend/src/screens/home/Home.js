import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Snowfall from "react-snowfall";
import { ImLibrary } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import catData from "../../data/database/categoryData";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../redux/action/books";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
  
  } = useSelector((state) => state);

  console.log(books, "books");
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(`/category/${url}`);
  };
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
      {/* body section */}
      <div className="bg-gradient-to-r from-[#2c2c2c] to-white pb-[100px]">
        <p className={styles.explore}>Explore our books</p>
        <div className={styles.main}>
          {books &&
            books.slice(0, 4).map((books, id) => (
              <div className={styles.book} key={id}>
                <img src={books.bookImage} alt="" />
                <p>
                  <span className="text-[#a54b4b] text-[20px]">Author(s):</span>{" "}
                  {books.author}
                </p>
                <p>
                  <span className="text-[#a54b4b] text-[20px]">Title: </span>
                  {books.title}
                </p>
                <div className="flex gap-[10px]">
                  <button className="border p-[10px] bg-[#2e5c2e] text-white">
                    About Book
                  </button>
                  <a href={books.bookPDF}>
                    <button className="border p-[10px] bg-[#2e5c2e] text-white">
                      Read
                    </button>
                  </a>
                </div>
              </div>
            ))}
          <p></p>
        </div>
        <Link to={"/books"}>
          {" "}
          <button className={styles.more}>All Books</button>
        </Link>
        {/* categories */}
        <div>
          <p className={styles.ecat}> Explore The Categories</p>

          <div className={styles.cat1}>
            {catData.map((cat) => (
              <div className={styles.cat}>
                <img src={cat.catImg} className='w-[190px]' alt="" />
                <i><p className={styles.tex}>{cat.text}</p></i>
                <button
                  onClick={() => handleNavigate(cat.url)}
                  className="border p-[7px] text-[#723030] bg-[#9d9999] w-[120px] rounded-[5px]"
                >
                {cat.url}
                </button>
              </div>
            ))}
          </div>
          <Link to={"/category"}>
            <button className={styles.more}>More</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
