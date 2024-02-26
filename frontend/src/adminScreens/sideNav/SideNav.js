import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="h-[100vh] bg-[#a42c2c] text-[white] text-[25px] w-[20vw] cursor-pointer top-[5vw] fixed ">
      <p className="text-[35px] text-center mt-[30px] mb-[30px]">Dashboard</p>

      <div className="pl-[20px]">
        <p className="mb-[30px] text-[#46d9b9]">Category</p>

        <NavLink to={"createCategory"}>Create Category</NavLink>

        <p className=" flex flex-col mt-[70px] mb-[30px] text-[#46d9b9]">
          Books
        </p>

        <NavLink className="mb-[20px]" to={"createBooks"}>
          Create Books
        </NavLink>
        <br />

        <NavLink to={"allBooks"}>All Books</NavLink>

        <p className="mt-[30px] text-[#46d9b9]">User</p>

        <NavLink to={"getUsers"}>Get Users</NavLink>
      </div>
    </div>
  );
};

export default SideNav;
