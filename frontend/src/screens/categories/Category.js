import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Category = () => {
  return (
    <div className="pt-[120px] bg-[#959393]">
      <p className="text-[60px] text-[red] text-center">Category of Books</p>

      <div className="flex text-center items-center justify-center overflow-x-scroll gap-[50px] text-[28px] mt-[50px] text-[white]">
        <span>
          <Link to={"science"} className="active:text-[orange] focus:text-[orange]">Science fiction</Link>
        </span>
        <span>
          <Link to={"fairy"} className="focus:text-[orange]">Love and Romance</Link>
        </span>
        <span>
          <Link to={"history"} className="focus:text-[orange]">History</Link>
        </span>
        <span>
          <Link to={"kids"} className="focus:text-[orange]">Kids</Link>
        </span>
        <span>
          <Link to={"politics"} className="focus:text-[orange]">Politics</Link>
        </span>
      </div>
      <Outlet/>
    </div>
  );
};

export default Category;
