import { useState, useEffect } from "react"; // Import useState and useEffect together
import MainLayout from "../layout/MainLayout";
import { useParams, Link } from "react-router-dom"; // Import useParams
import { ENDPOINTS } from "../config/apiConfig";
import { apiHelper } from "../context/ApiContext";
import WidePreview from "../components/WidePreview";
import loadingGif from "../assets/images/loading.gif";

import axios from "axios";
import "./ReadPage.css";

function NotFoundPage() {
  let { parameters } = useParams();

  return (
    <MainLayout>
      <div className="loading-container not-found-container">
        <img src={loadingGif} alt="Loading..." />
        <p>404 - Page Not Found</p>
        <Link to="/">Return to homepage</Link>
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
