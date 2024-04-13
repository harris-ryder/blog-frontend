import { useState, useEffect } from "react"; // Import useState and useEffect together
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { ENDPOINTS } from "../config/apiConfig";
import { apiHelper } from "../context/ApiContext";
import NormalPreview from "../components/NormalPreview";
import WidePreview from "../components/WidePreview";
import "./HomePage.css";
import loadingGif from '../assets/images/loading.gif';
import { useNavigate } from "react-router-dom";



function HomePage() {
  const { isLoggedIn, apiData, fetchOptional, fetchAuth, logout, login, updateApiData} =
    apiHelper();

    const navigate = useNavigate(); // Initialize the navigate function


    function navToEditor(){
      navigate(`/create`);
    }
  function renderArticles(inputData) {
    
    let postData = inputData.posts;

    const firstHalf = postData.slice(0, postData.length / 2); //Taking first 5/10 articles

    return firstHalf.map((article, index) => (
      <NormalPreview
        key={index}
        title={article.title}
        text={article.text}
        size={index === 1 ? 2 : 1}
        imageUrl={article.imageUrl}
        tag={article.tags || "General"}
        url = {article.url}
      />
    ));
  }

  function renderFeatured(inputData) {

    let postData = inputData.posts;

    const secondHalf = postData.slice(postData.length / 2, postData.length); //Taking 2nd 5/10 articles
  
    return secondHalf.map((article, index) => (
      <WidePreview
        key={index}
        title={article.title}
        text={article.text}
        size={index === 1 ? 2 : 1}
        imageUrl={article.imageUrl}
        tag={article.tags || "General"}
        url = {article.url}
      />
    ));
  }

  useEffect(() => {
    updateApiData(null);
    fetchOptional(ENDPOINTS.HOME);
  }, []);

  

  return (
    <MainLayout>
      {apiData && apiData.posts ? (
        <>
          <div className="prev-article-container">
            {apiData.posts && renderArticles(apiData)}
          </div>
  
          <div className="join-container">
            <div className="text">
              <h3>Want to be a writer?</h3>
              <p>
                Try out the article sandbox! This suite allows you to create and
                edit posts.
              </p>
              <button onClick={navToEditor} className="lgn-btn">Try out</button>
            </div>
  
            <div className="img"></div>
          </div>
  
          <div className="featured-container">
            <h3>Featured Content</h3>
  
            <div className="tag-group">
              <p>Landscape</p>
              <p>Pop</p>
              <p>Culture</p>
              <p>Choco</p>
              <p>Multiverse</p>
            </div>
  
            <div className="tagged-articles">
              {apiData.posts && renderFeatured(apiData)}
            </div>
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

export default HomePage;
