import React, { useState, useEffect } from "react";
import "./Editor.css"; // Assuming you have a CSS file for styling

export default function Editor({ formData, update, imageUpload, handleSubmit, isLoggedIn }) {

const [tab, setTab] = useState(1);
const [tempTag, setTempTag] = useState("");

  const addTempTag = (e) => {



    if (tempTag && e.key === 'Enter') {
      const lowerCaseTempTag = tempTag.toLowerCase();
      const updatedTags = formData.tags.filter(tag => tag.toLowerCase() !== lowerCaseTempTag);

      if (formData.tags.includes(lowerCaseTempTag)) {
        update("tags", updatedTags);
      } else {
        update("tags", [...formData.tags, tempTag]);
      }
      setTempTag("");
    }


  };

  const updateTempTag = (e) => {
  setTempTag(e.target.value);
  }

  const returnTags = () => {

    if (formData.tags) {
        return formData.tags.join(",");

    } else {
        return "";
    }
  };



  return (
    <>
      <div className="editor-tabs">
        <div
          className={tab === 1 ? "tab active" : "tab"}
          onClick={() => setTab(1)}
        >
          Title
        </div>
        <div
          className={tab === 2 ? "tab active" : "tab"}
          onClick={() => setTab(2)}
        >
          Body
        </div>
        <div
          className={tab === 3 ? "tab active" : "tab"}
          onClick={() => setTab(3)}
        >
          Tags
        </div>
        <div
          className={tab === 4 ? "tab active" : "tab"}
          onClick={() => setTab(4)}
        >
          Image
        </div>
        <div
          className={tab === 5 ? "tab active" : "tab"}
          onClick={() => setTab(5)}
        >
          Submit
        </div>
      </div>

      <div className={tab === 1 ? "editor-form active" : "editor-form"}>
        <div>
          <label className="input" htmlFor="title">
            <input
              id="title"
              type="text"
              value={formData.title}
              className="input__field"
              onChange={(e) =>
                update(e.target.id, e.target.value)
              }
            />
            <span className="input__label">Title</span>
          </label>
        </div>

        <div>
          <label className="input" htmlFor="author">
            <input
              id="author"
              type="text"
              value={formData.author}
              className="input__field"
              onChange={(e) =>
                update(e.target.id, e.target.value)

              }
            />
            <span className="input__label">Author</span>
          </label>
        </div>
      </div>

      <div className={tab === 2 ? "editor-form active" : "editor-form"}>
        <p>
          This editor uses Markdown to build the content of blog posts. If you
          do not know how to use Markdown,<a href="https://commonmark.org/help/" target="_blank">see this guide.</a>
        </p>
        <div>
          <label className="input" htmlFor="title">
            <textarea
              id="body"
              className="input__field"
              value={formData.body}
              onChange={(e) =>
                update(e.target.id, e.target.value)
              }
              rows="4" // You can adjust the number of rows as needed
            />
            <span className="input__label">Body</span>
          </label>
        </div>
      </div>


      <div className={tab === 3 ? "editor-form active" : "editor-form"}>

        <p>Included tags: {returnTags()}</p>
        <p>To remove an existing tag, enter the tag value and submit</p>
        <div>
          <label className="input" htmlFor="tags">
            <input
              id="tags"
              type="text"
              value={tempTag}
              className="input__field"
              onChange={(e) => updateTempTag(e)}
              onKeyDown={(e) => addTempTag(e)}
            />
            <span className="input__label">Tag</span>
          </label>
        </div>
      </div>

      <div className={tab === 4 ? "editor-form active" : "editor-form"}>
        
      <div>
          <label className="input" htmlFor="imageOwner">
            <input
              id="imageOwner"
              type="text"
              value={formData.imageOwner}
              className="input__field"
              onChange={(e) =>
                update(e.target.id, e.target.value)
              }
            />
            <span className="input__label">Image Owner</span>
          </label>
        </div>
        
        <div>    
            <input
              id="image"
              type="file"
              name="image"
              onChange={imageUpload}
            />

        </div>
      </div>

      <div className={tab === 5 ? "editor-form active" : "editor-form"}>
        <p>Post by is made public by default - Go to your profile to manage your posts</p>
        <p>You need to be logged in to post</p>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit Post</button>
      </div>

            
    </>
  );
}
