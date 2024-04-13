import { useState, useEffect } from "react"; // Import useState and useEffect together
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { ENDPOINTS } from "../config/apiConfig";
import {apiHelper} from "../context/ApiContext";
import NormalPreview from "../components/NormalPreview";

function PostPage() {

    const {isLoggedIn, apiData, fetchOptional, fetchAuth} = apiHelper();
    const [postsData, setPostsData] = useState(false);

    const handleDelete = async (articleId) => {
        try {
            const response = await axios.delete(ENDPOINTS.DELETE_POST(articleId));
            console.log("Article deleted successfully:", response.data);
            // Optionally, refresh the articles list or handle UI changes here
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    function renderArticles(articlesArray) {
        return articlesArray.map((article, index) => (
          <div key={index} style={{padding: '20px'}} >
            <p>Title: {article.title}</p>
            <p>Text: {article.text}</p>
            {article.imageUrl && <img src={article.imageUrl} alt="Article Image" style={{maxWidth: '200px'}} />}
            <p>Tag: {article.tags || 'General'}</p>
            <button onClick={() => handleDelete(article.url)}>Delete</button>
            <p>{article.id}</p>

          </div>
        ));
      }
 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GRAB);
        console.log("Data fetched successfully:", response.data);
        setPostsData(response.data);
        // Process the fetched data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);






  return (
    <MainLayout>
      <div>We @ POSTS</div>
      {postsData && renderArticles(postsData)};
    </MainLayout>
  );
}

export default PostPage;