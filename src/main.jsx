import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ReadPage from "./pages/ReadPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import { ApiProvider } from "./context/ApiContext";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import './assets/css/fonts.css';


import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/account/login",
    element: <LoginPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/account/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts/category/:parameters",
    element: <ReadPage />,
  },
  {
    path: "/create",
    element: <CreatePage/>, 
  },
  {
    path: "/grab",
    element: <PostPage/>, 
  },
  {
    path: "/posts/:parameters",
    element: <ArticlePage/>
  },
  {
    path:"*",
    element: <NotFoundPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider>
    <RouterProvider router={router} />
  </ApiProvider>
);
