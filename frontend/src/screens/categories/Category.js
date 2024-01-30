import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Category = () => {
  return (
    <div className="pt-[120px] bg-[#959393]">
      <p className="text-[60px] text-[red] text-center">Category of Books</p>

      <div className="flex text-center items-center justify-center gap-[50px] text-[28px] mt-[50px] text-[grey]">
        <span>
          <Link to={"science"} className="focus:text-[red]">Science fiction</Link>
        </span>
        <span>
          <Link to={"fairy"} className="focus:text-[red]">Love and Romance</Link>
        </span>
        <span>
          <Link to={"history"} className="focus:text-[red]">History</Link>
        </span>
        <span>
          <Link to={"crime"} className="focus:text-[red]">Crime story</Link>
        </span>
        <span>
          <Link to={"politics"} className="focus:text-[red]">Politics</Link>
        </span>
      </div>
      <Outlet/>
    </div>
  );
};

export default Category;
