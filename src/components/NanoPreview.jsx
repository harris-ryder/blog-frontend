import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHelper } from "../context/ApiContext";

import "./NavBar.css";


function NanoPreview(props) {
  const { title, tag, imageUrl, url } = props;
  const navigate = useNavigate();


  function toArticle() {
    navigate(`/${url}`);
  }
  

  return (
    <>
      <div onClick={toArticle} className="nano-prev-container">
        <div
          className="nano-prev-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: "100%",
            aspectRatio: "16 / 9",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="nano-prev-text">
          <Link>{title}</Link>
          <p>{tag}</p>
        </div>
      </div>
    </>
  );
}

export default NanoPreview;
