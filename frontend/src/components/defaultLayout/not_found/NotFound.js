import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pt-[300px]">
      <h4 className="text-[50px] text-[red] justify-center flex items-center">
        Page Not Found
      </h4>
      <Link
        to="/login"
        className="text-[blue] text-[30px] justify-center flex items-center"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
