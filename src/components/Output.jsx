import React, { useState, useEffect } from "react";
import "./Output.css"; // Assuming you have a CSS file for styling
import ReactMarkdown from "react-markdown";

export default function Output({ formData }) {

    console.log(formData.body);
  return (
    <>
      <div className="tag-group-article">
        {formData.tags
          ? formData.tags.map((tag, index) => <p key={index}>{tag}</p>)
          : ""}
      </div>
      <h1>{formData.title}</h1>

      <p>{new Date().toLocaleDateString() + " \u2022 " + formData.author}</p>

      {formData.image && <img src={formData.image} alt="Article" />}
      <p className="image-credits">Photo by {formData.imageOwner}</p>
      <div className="markdown-text">
        <ReactMarkdown>{formData.body}</ReactMarkdown>
      </div>
    </>
  );
}
