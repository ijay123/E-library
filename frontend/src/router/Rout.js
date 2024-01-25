import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../screens/home/Home";
import Category from "../screens/categories/Category";
import Books from "../screens/books/Books";
import About from "../screens/About/About";
import Signup from "../screens/signup/Signup";
import Layout from "../components/defaultLayout/layout/Layout";
import NotFound from "../components/defaultLayout/not_found/NotFound";
import Login from "../screens/login/Login";

// admin imports

import AdminLayout from "../adminScreens/adminLayout/AdminLayout";
import { AdminProtectedRoute } from "../adminScreens/adminLayout/AdminProtectedRoute";
import Dashboard from "../adminScreens/dashboard/Dashboard";
import AdminBooks from "../adminScreens/main/books/Books";
import AdminCategory from "../adminScreens/main/category/Category";
import AdminHome from "../adminScreens/adminHome/AdminHome";
import Science from "../screens/categories/sub-categories/Science";
import Horror from "../screens/categories/sub-categories/Horror";
import Fairy from "../screens/categories/sub-categories/Fairy";
import Crime from "../screens/categories/sub-categories/Crime";
import Classic from "../screens/categories/sub-categories/Classic";

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
        <Route path="science" element={<Science />} />
        <Route path="classic" element={<Classic />} />
        <Route path="crime" element={<Crime />} />
        <Route path="fairy" element={<Fairy />} />
        <Route path="horror" element={<Horror />} />
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
        path="/about"
        element={
          <Layout>
            <About />
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
        path="/adminHome"
        element={
          <AdminLayout>
            <AdminHome />
          </AdminLayout>
        }
      >
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
