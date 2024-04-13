import { useState, useEffect } from "react"; // Import useState and useEffect together
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../config/apiConfig";
import { apiHelper } from "../context/ApiContext";
import ManagePreview from "../components/ManagePreview";
import "./AccountPage.css";
import loadingGif from "../assets/images/loading.gif";

function AccountPage() {
  const { isLoggedIn, apiData, fetchOptional, fetchAuth } = apiHelper();

  useEffect(() => {
    fetchAuth(ENDPOINTS.ACCOUNT);
  }, []);

  const handleDelete = async (e) => {
    try {
      console.log(e.target.id);
      const response = await axios.delete(ENDPOINTS.DELETE_POST(e.target.id));
      console.log("Article deleted successfully:", response.data);
      // Optionally, refresh the articles list or handle UI changes here
      //window.location.reload();
      fetchOptional(ENDPOINTS.ACCOUNT);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handlePublic = async (e) => {
    try {
      console.log(e.target.id);
      const response = await axios.post(ENDPOINTS.TOGGLE_POST(e.target.id));
      console.log("Article updated successfully:", response.data);
      // Optionally, refresh the articles list or handle UI changes here
      window.location.reload();
    } catch (error) {
      console.error("Error updated article:", error);
    }
  };

  function renderArticles(apiData) {
    return apiData.map((article, index) => (
      <ManagePreview
        key={index}
        title={article.title}
        text={article.text}
        size={1}
        imageUrl={article.imageUrl}
        tag={article.tags || "General"}
        url={article.url}
        isPublic={article.public}
        deletePost={handleDelete}
        togglePost={handlePublic}
      />
    ));
  }

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return (
      <>
        <MainLayout>
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." />
          <p>
            Please <Link to="/account/login">login</Link> to access this page!
          </p>
        </div>
          
        </MainLayout>
      </>
    );
  }

  return (
    <MainLayout>
      {apiData && apiData.user ? (
        <>
          <div className="account-header-container">
            <h3 className="account-header-center">
              Hello, {apiData.user.username}
            </h3>

            <h4 className="account-header-center">Your Dashboard</h4>
            <p className="account-header-center">
              This page is currently under construction
            </p>
          </div>
          <div className="user-info">
            <div>
              <p className="bold">First Name</p>
              <p>{apiData.user.firstName}</p>
              <button>CHANGE FIRST NAME</button>
            </div>

            <div>
              <p className="bold">Last Name</p>
              <p>{apiData.user.lastName}</p>
              <button>CHANGE LAST NAME</button>
            </div>

            <div>
              <p className="bold">Username</p>
              <p>{apiData.user.username}</p>
              <button>CHANGE USERNAME</button>
            </div>
          </div>

          <div className="account-break-line"></div>
          <div className="account-posts-container">
            <h3 className="manage-posts-header">Manage Your Posts</h3>
            {apiData.posts ? renderArticles(apiData.posts) : ""}
          </div>
        </>
      ) : (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." />
        </div>
      )}
    </MainLayout>
  );
}

export default AccountPage;
