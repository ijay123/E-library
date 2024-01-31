import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../redux/action/books";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
  } = useSelector((state) => state);

  console.log(books, "books");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBooksAction());
  }, [dispatch]);

  return (
    <div className="pt-[100px] bg-[#959393]">
      <p className="text-[60px] text-[#9e3636] flex justify-center mb-[100px] mt-[70px]">
        All Books
      </p>
      <div className="flex flex-wrap gap-[50px] px-[100px] items-center justify-center">
        {books &&
          books.map((books, id) => (
            <div className=" w-[250px] text-[white] border p-[5px]" key={id}>
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
                <Link to={`/aboutBook/:${books._id}`}>
                  <button className="border p-[10px] bg-[#2e5c2e]">
                    About Book
                  </button>
                </Link>
                <a href={books.bookPDF}>
                  <button className="border p-[10px] bg-[#2e5c2e]">Read</button>
                </a>
              </div>
              {/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
