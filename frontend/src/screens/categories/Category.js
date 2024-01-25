import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Category = () => {
  return (
    <div className="pt-[120px] bg-[#e7e1e1]">
      <p className="text-[60px] text-[red] text-center">Category of Books</p>

      <div className="flex text-center items-center justify-center gap-[50px] text-[28px] mt-[50px] text-[grey]">
        <span>
          <Link to={"science"}>Science fiction</Link>
        </span>
        <span>
          <Link to={"fairy"}>Fairy tale</Link>
        </span>
        <span>
          <Link to={"classic"}>Classic</Link>
        </span>
        <span>
          <Link to={"crime"}>Crime story</Link>
        </span>
        <span>
          <Link to={"horror"}>Horror</Link>
        </span>
      </div>
      <Outlet/>
    </div>
  );
};

export default Category;
