import React from "react";
import "./NormalPreview.css";
import { useNavigate } from "react-router-dom";

function NormalPreview(props) {
  const { title, tag, imageUrl, text, size, url } = props;
  const navigate = useNavigate(); // Initialize the navigate function


  function goToArticle() {
    navigate(`${url}`);
  }

  return (
    <>
      <div onClick= {goToArticle} className={`normal-preview ${size === 2 ? "large" : ""}`}>

        <div className="image-container">
          <img src={imageUrl} alt={title} />
          <span>{tag[0]}</span>
        </div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </>
  );
}

export default NormalPreview;
