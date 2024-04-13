import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../config/apiConfig";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import Editor from "../components/Editor";
import Output from "../components/Output";
import { apiHelper } from "../context/ApiContext";
import { useNavigate } from "react-router-dom"; // Add this import at the top


import "./CreatePage.css";

let markDefault = `### Creating Your Blog Post with Markdown

Welcome to the preview page! Here, you can use Markdown to format your blog post and make it visually appealing.

#### Getting Started

To start, you can use basic Markdown syntax to style your text. For example, you can make text **bold**, *italic*, or \`monospace\`.

#### Adding Code Blocks

When writing about code, you can use code blocks:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

#### Conclusion

Markdown is a simple yet powerful tool for creating well-formatted blog posts. Experiment with different syntax to see what works best for your content!

Happy blogging!
`;

import writerImage from "../assets/images/writer.png";

function CreatePage() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "Create with Newspaper Editor",
    author: "Harris Ryder",
    body: markDefault,
    tags: ["abc", "always", "be", "closing"],
    image: writerImage, // Assuming you'll handle file inputs separately
    imageFile: null,
    imageOwner: "Harris Ryder",
  });

  const navigate = useNavigate(); // Initialize the navigate function


  const { isLoggedIn, apiData, fetchOptional, logout, updateLoginStatus, updateApiData} =
    apiHelper();

  const updateFormData = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {

    if (!isLoggedIn) {
        return console.log("No User")
    }
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("title", formData.title);
    sendData.append("text", formData.body);
    if (formData.tags) {
      sendData.append("tags", formData.tags.join(','));
    } else {
      sendData.append("tags", "general");
    }
    // Assuming tags are comma-separated
    console.log(`Image: ${formData.imageFile}`)
    if (formData.imageFile) sendData.append("image", formData.imageFile);
    if (formData.imageOwner) sendData.append("imageOwner", formData.imageOwner);
    const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` } };

    axios
      .post(ENDPOINTS.CREATE, sendData, config)
      .then((response) => {
        console.log("Post created successfully:", response.data);
        navigate(`../${response.data.post.url}`);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });


  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const objectURL = URL.createObjectURL(e.target.files[0]);
  
      setFormData(prevFormData => ({
        ...prevFormData,
        image: objectURL, // Set the image URL for preview
        imageFile: e.target.files[0], // Set the actual file for upload
      }));
  
    } else {
      console.log("No file selected.");
    }
  };

  useEffect(() => {
    fetchOptional(ENDPOINTS.CREATE);
    const editor = document.querySelector(".editor-container");
    const handle = document.querySelector(".create-drag-handle");

    let isMouseDown = false;
    let initX = 0;
    let editorWidth = editor ? editor.offsetWidth : 0; // Ensure editor exists

    const handleMouseDown = (e) => {
      isMouseDown = true;
      initX = e.clientX;
      editorWidth = editor.offsetWidth;
    };

    const handleMouseMove = (e) => {
      if (isMouseDown) {
        const cx = e.clientX - initX;
        const newWidth = editorWidth + cx;
        editor.style.width = `${newWidth}px`;
        console.log(`Change: ${cx}`);
        console.log(`Width: ${editor.style.width}`);
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      initX = 0;
    };

    // Attach event listeners
    handle?.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup function to remove event listeners
    return () => {
      handle?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div>
      <MainLayout>
        <div className="create-header">
          <h3>Welcome to the Editor Suite!</h3>
          <p>
            Add your post details in the editing panel and your changes will be
            reflected in the post preview.
          </p>

          <p> Drag the grey bar to resize containers.</p>
        </div>

        <div className="create-container">
          <div className="editor-container">
            <Editor
              formData={formData}
              update={updateFormData}
              imageUpload={handleImageChange}
              handleSubmit={handleSubmit}
              isLoggedIn={isLoggedIn}
            />
          </div>
          <div className="create-drag-handle"></div>
          <div className="output-container">
            <Output formData={formData} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default CreatePage;
