import React from "react";
import "./WidePreview.css";
import "./ManagePreview.css";

function ManagePreview(props) {
  const { title, tag, imageUrl, text,url,isPublic, deletePost, togglePost} = props;

  function filterMarkdown(input) {
    const markdownSpecialCharacters = /[\\`\*_\{\}\[\]\(\)#\+\-\.\!]/g;
    return input.replace(markdownSpecialCharacters, "");
  }


  return (
    <>
      <div className={`wide-preview`}>

    
         <img src={imageUrl} alt={title}/>
        
        <div className="text">
          <div className="manage-tag-group">{tag.map((element, index) => <a key={index}>{element}</a>)}</div>
          <h3>{title}</h3>
          <p>{filterMarkdown(text)}</p>
          <div className="buttons">
          <button id={url} onClick={togglePost}> { isPublic ? "Set Private" : "Set Public"}</button>
          <button id={url} onClick={deletePost}>Delete Post</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagePreview;
