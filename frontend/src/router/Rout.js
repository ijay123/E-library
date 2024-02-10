import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../screens/home/Home";
import Category from "../screens/categories/Category";
import Books from "../screens/books/Books";

import Signup from "../screens/signup/Signup";
import Layout from "../components/defaultLayout/layout/Layout";
import NotFound from "../components/defaultLayout/not_found/NotFound";
import Login from "../screens/login/Login";
import AboutBook from "../screens/books/AboutBook";
import Contact from "../screens/contact/Contact";

// admin imports

import AdminLayout from "../adminScreens/adminLayout/AdminLayout";
import { AdminProtectedRoute } from "../adminScreens/adminLayout/AdminProtectedRoute";
import Dashboard from "../adminScreens/dashboard/Dashboard";
import AdminBooks from "../adminScreens/main/books/Books";
import AdminCategory from "../adminScreens/main/category/Category";
import AdminHome from "../adminScreens/adminHome/AdminHome";
import EditPage from "../adminScreens/main/books/EditPage";
import Science from "../screens/categories/sub-categories/Science";
import Politics from "../screens/categories/sub-categories/PoliticsCat";
import Romance from "../screens/categories/sub-categories/Romance";
import Kids from "../screens/categories/sub-categories/Kids";
import History from "../screens/categories/sub-categories/History";
import AllBooks from "../adminScreens/main/books/AllBooks";
import Users from "../adminScreens/main/users/Users";

const Rout = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <AdminProtectedRoute>
            <Home />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/category"
        element={
          <Layout>
            <Category />
          </Layout>
        }
      >
        <Route index element={<Navigate to="science" replace />} />
        <Route path="science" element={<Science />} />
        <Route path="history" element={<History />} />
        <Route path="kids" element={<Kids />} />
        <Route path="fairy" element={<Romance />} />
        <Route path="politics" element={<Politics />} />
      </Route>

      <Route
        path="/books"
        element={
          <Layout>
            <Books />
          </Layout>
        }
      />
      <Route
        path="/aboutBook/:id"
        element={
          <Layout>
            <AboutBook />
          </Layout>
        }
      />

   


<Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        }
      />
         <Route
        path="/editPage/:id"
        element={
          <AdminLayout>
            <EditPage />
          </AdminLayout>
        }
      />
      <Route
        path="/adminHome"
        element={
          <AdminLayout>
            <AdminHome />
          </AdminLayout>
        }
      >
        
         <Route index element={<Navigate to="createCategory" replace />} />
        <Route
          path="createCategory"
          element={
            <AdminLayout>
              <AdminCategory />
            </AdminLayout>
          }
        />
        <Route
          path="createBooks"
          element={
            <AdminLayout>
              <AdminBooks />
            </AdminLayout>
          }
        />
        <Route
          path="allBooks"
          element={
            <AdminLayout>
              <AllBooks />
            </AdminLayout>
          }
        />
        <Route
          path="getUsers"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
      </Route>

      {/* end */}

      <Route path="/notFound" element={<NotFound />} />

      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={"/notFound"} />} />
    </Routes>
  );
};

export default Rout;
