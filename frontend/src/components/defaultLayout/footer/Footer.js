import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex h-[100px] justify-center items-center gap-[300px]">
      <div className="flex gap-[50px] text-[red]">
        <Link to={'/about'}>About Us</Link>
        <Link to={'/contact'}>Contact Us</Link>
      </div>

      <div className="flex gap-[40px]">
        <a href="https://github.com/ijay123?tab=repositories"><FaGithub className="text-[30px]"/></a>
        <a href="https://www.linkedin.com/in/ijeoma-igbokwe-55a441198/"><FaLinkedin className="text-[30px]"/></a>
      </div>
    </div>
  );
};

export default Footer;
