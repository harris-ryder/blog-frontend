import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Output from "../components/Output";
import { apiHelper } from "../context/ApiContext";
import { ENDPOINTS } from "../config/apiConfig";
import MainLayout from "../layout/MainLayout";
import ReactMarkdown from "react-markdown";
import loadingGif from '../assets/images/loading.gif';


export default function ArticlePage() {
  const { isLoggedIn, apiData, fetchOptional, fetchAuth } = apiHelper();
  let { parameters } = useParams();
  console.log(parameters);

  useEffect(() => {
    fetchOptional(ENDPOINTS.ARTICLE(parameters));
  }, []);

  let formData = null;

  if (apiData && apiData.post) {
    console.log(apiData.post);
    formData = {
      tags: apiData.post.tags,
      title: apiData.post.title,
      author: apiData.post.user.username,
      image: apiData.post.imageUrl,
      imageOwner: apiData.post.imageOwner ? apiData.post.imageOwner : "Unknown",
      body: apiData.post.text,
    };
  } else {
    formData = {
      tags: [""],
    };
  }

  return (
    <MainLayout>
      <div className="article">
        {apiData && apiData.post ? (
          <>
            <div className="tag-group-article">
              {formData.tags
                ? formData.tags.map((tag, index) => <p key={index}>{tag}</p>)
                : ""}
            </div>
            <h1>{formData.title}</h1>

            <p className="date-author">
              {new Date().toLocaleDateString() + " \u2022 " + formData.author}
            </p>

            {formData.image && <img src={formData.image} alt="Article" />}
            <p className="image-credits">Photo by {formData.imageOwner}</p>
            <div className="markdown-text">
              <ReactMarkdown>{formData.body}</ReactMarkdown>
            </div>
          </>
        ) : (
          <div className="loading-container">
          <img src={loadingGif} alt="Loading..." />
        </div>
        )}
      </div>
    </MainLayout>
  );
}
