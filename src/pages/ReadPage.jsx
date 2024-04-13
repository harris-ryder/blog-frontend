import { useState, useEffect } from "react"; // Import useState and useEffect together
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom"; // Import useParams
import { ENDPOINTS } from "../config/apiConfig";
import { apiHelper } from "../context/ApiContext";
import WidePreview from "../components/WidePreview";
import loadingGif from '../assets/images/loading.gif';

import axios from "axios";
import "./ReadPage.css";

function ReadPage() {
  let { parameters } = useParams();
  const [postsData, setPostsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINTS.READ(parameters));
        console.log("Data fetched successfully:", response.data);
        setPostsData(response.data.posts);
        // Process the fetched data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parameters]);

  function renderFeatured(apiData) {
    return apiData.map((article, index) => (
      <WidePreview
        key={index}
        title={article.title}
        text={article.text}
        size={1}
        imageUrl={article.imageUrl}
        tag={article.tags || "General"}
        url={article.url}
      />
    ));
  }

  return (
    <MainLayout>

      {postsData ? (
        <div className="articles-by-category">
          {postsData ? renderFeatured(postsData) : <p>Loading...</p>}
        </div>
      ) : (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." />
        </div>
      )}

    </MainLayout>
  );
}

export default ReadPage;
