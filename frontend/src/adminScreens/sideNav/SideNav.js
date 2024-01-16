import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="h-[100vh] bg-[#a42c2c] text-[white] text-[25px] w-[30vw] cursor-pointer top-[5vw] fixed">

      <p className="text-[35px] text-center mt-[30px] mb-[30px]">Dashboard</p>

      <p className="mb-[30px] text-[#46d9b9]">Category</p>

      <Link to={"createCategory"}>Create Category</Link>

      <p className="mt-[70px] mb-[30px] text-[#46d9b9]">Books</p>

      <Link to={"createBooks"}>Create Books</Link>

    </div>
  );
};

export default SideNav;
