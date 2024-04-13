import React from "react";
import NavBar from "../components/NavBar";
import { apiHelper } from "../context/ApiContext";
import { useEffect } from "react";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer/>
    </>
  );
}

export default MainLayout;
