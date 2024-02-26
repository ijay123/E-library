import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../../redux/action/books";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
  } = useSelector((state) => state);
  
  console.log(books, "allbooks");

  useEffect(() => {
    dispatch(getBooksAction());
  }, [dispatch]);

  return (
    <div className="w-[80vw]  top-[5vw] absolute right-0 bg-[white]">
      <table className="border-t-2">
        <thead>
          <tr className="text-[green] w-[100%] h-[50px]">
            <th>ID</th>
            <th >book</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
          
          </tr>
        </thead>
        <tbody>
          {books && books.map((book) => (
            <tr key={book._id} className="text-[brown] border-t-8 border-l-4 border-r-4">
              <td className="border-r-8 ">{book._id}</td>
              <td className="border-r-8 "><img src={book.bookImage} alt="" className="w-[100px]"/></td>
              <td className="border-r-8 ">{book.title}</td>
              <td className="border-r-8 ">{book.author}</td>
              <td>{book.publisher}</td>
              <td><Link to={`/editPage/${book._id}`}><button className="border bg-[green] text-[white]">Edit</button></Link></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBooks;
