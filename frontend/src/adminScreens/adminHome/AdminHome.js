import React from "react";

import { Outlet } from "react-router-dom";
import SideNav from "../sideNav/SideNav";


const AdminHome = () => {
  return (
    <div className="flex flex-col ">
      
   
        <SideNav/>
        <main>{<Outlet/>}</main>
      
     
    </div>
  );
};

export default AdminHome;
