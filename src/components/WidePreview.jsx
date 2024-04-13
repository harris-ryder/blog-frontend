import React from "react";
import "./WidePreview.css";
import { useNavigate } from "react-router-dom";


function WidePreview(props) {
  const { title, tag, imageUrl, text, size, url } = props;

  const navigate = useNavigate();

  function goToArticle() {
    navigate(`../../${url}`);
  }

  function filterMarkdown(input) {
    const markdownSpecialCharacters = /[\\`\*_\{\}\[\]\(\)#\+\-\.\!]/g;
    return input.replace(markdownSpecialCharacters, "");
  }

  return (
    <>
      <div onClick = {goToArticle} className={`wide-preview`}>
        <img src={imageUrl} alt={title} />

        <div className="text">
          <a>{tag[0]}</a>
          <h3>{title}</h3>
          <p>{filterMarkdown(text)}</p>
        </div>
      </div>
    </>
  );
}

export default WidePreview;
