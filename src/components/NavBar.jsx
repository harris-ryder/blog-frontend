import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { apiHelper } from "../context/ApiContext";
import { useNavigate } from "react-router-dom"; // Add this import at the top
import NanoPreview from "./NanoPreview";
//DELETE LATER ONCE API IMPLEMENTED
import articleImage1 from "../assets/images/article-1.jpeg"; // Import the image
import articleImage2 from "../assets/images/article-2.jpeg"; // Import the image

function NavBar() {
  const [readDropdown, setReadDropdown] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const { isLoggedIn, logout, login, apiData, navData } = apiHelper();

  const toggleRead = () => {
    setReadDropdown(!readDropdown);
  };

  const toggleAccount = () => {
    setAccountDropdown(!accountDropdown);
  };

  const toggleMobileDropDown = () => {
    setMobileDropdown(!mobileDropdown);
  };

  const navigate = useNavigate();

  const toLoginPage = () => {
    navigate("/account/login");
  };

    useEffect(() => {
      console.log(`From navbar`);
      console.log(apiData);
  },[apiData])

  return (
    <>
      <div className="header">
        <div className="navbar">
          <button
            className={`header-left drop-btn ${
              readDropdown ? "visible" : "hidden"
            }`}
            onClick={toggleRead}
          >
            Read
          </button>

          <Link className="header-title title-large center" to="/">
            NEWSPAPER
          </Link>

          {!isLoggedIn ? (
            <>
              <button className="header-right lgn-btn" onClick={toLoginPage}>
                Log in
              </button>
            </>
          ) : (
            <>
              <div
                className={`header-account ${
                  accountDropdown ? "visible" : "hidden"
                }`}
                onClick={toggleAccount}
              >
                {" "}
              </div>
            </>
          )}

          <div className="dropdown-content">
            <div className="dropdown-content-topics">
              <p>Topics</p>
              <Link to="/posts/category/tech">Technology</Link>
              <Link to="/posts/category/art">Art</Link>
              <Link to="/posts/category/travel">Travel</Link>
              <Link to="/posts/category/lifestyle">Lifestyle</Link>
              <Link to="/posts/category/politics">Politics</Link>
              <Link to="/posts/category/interiordesign">Interior Design</Link>
            </div>

            <div className="dropdown-content-articles">
              {(navData) ? (
                <>
                  <NanoPreview
                    title={navData[0].title}
                    tag={navData[0].tags[0]}
                    imageUrl={navData[0].imageUrl}
                    url={navData[0].url}
                  />
                  <NanoPreview
                    title={navData[1].title}
                    tag={navData[1].tags[0]}
                    imageUrl={navData[1].imageUrl}
                    url={navData[1].url}
                  />
                </>
              ) : (
                <>
                  <NanoPreview
                    title={"Exploring the Hidden Gems of Bali"}
                    tag={"Travel"}
                    imageUrl={articleImage2}
                  />
                  <NanoPreview
                    title="Breakthroughs in the Fibonacci Series"
                    tag="Technology"
                    imageUrl={articleImage1}
                  />
                </>
              )}
            </div>
          </div>

          <div className="account-dropdown-content">
            <p>{apiData && apiData.user ? apiData.user.username : ""}</p>
            <Link to="/create">Create Post</Link>
            <Link to="/account">Account</Link>
            <Link onClick={logout}>Logout</Link>
          </div>
        </div>
      </div>

      <div className="mb-header">
        <div className="mb-navbar">
          <Link className="header-title title-large" to="/">
            NEWSPAPER
          </Link>

          <label className="hamburger-menu">
            <input type="checkbox" onClick={toggleMobileDropDown} />
          </label>
        </div>

        <div className={`mb-dropdown ${mobileDropdown ? "visible" : "hidden"}`}>
          <Link
            className={`mb-link ${readDropdown ? "visible" : "hidden"}`}
            onClick={toggleRead}
          >
            Read
          </Link>

          <Link
            className={`mb-link-child ${readDropdown ? "visible" : "hidden"}`}
            to="/posts/category/technology"
          >
            Technology
          </Link>
          <Link
            className={`mb-link-child ${readDropdown ? "visible" : "hidden"}`}
            to="/posts/category/art"
          >
            Art
          </Link>
          <Link
            className={`mb-link-child ${readDropdown ? "visible" : "hidden"}`}
            to="/posts/category/travel"
          >
            Travel
          </Link>
          <Link
            className={`mb-link-child ${readDropdown ? "visible" : "hidden"}`}
            to="/posts/category/lifestyle"
          >
            Lifestyle
          </Link>
          <Link
            className={`mb-link-child ${readDropdown ? "visible" : "hidden"}`}
            to="/posts/category/politics"
          >
            Politics
          </Link>
          <Link
            className={`mb-link-child ${readDropdown ? "visible" : "hidden"}`}
            to="/posts/category/interior"
          >
            Interior Design
          </Link>

          {!isLoggedIn && (
            <Link className="mb-login" to="/account/login">
              Log in
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link
                className={`mb-link ${accountDropdown ? "visible" : "hidden"}`}
                onClick={toggleAccount}
              >
                Profile
              </Link>

              <Link
                className={`mb-link-child ${
                  accountDropdown ? "visible" : "hidden"
                }`}
                to="/posts/category/tech"
              >
                Create Post
              </Link>

              <Link
                className={`mb-link-child ${
                  accountDropdown ? "visible" : "hidden"
                }`}
                to="/account"
              >
                Account
              </Link>

              <Link
                className={`mb-link-child ${
                  accountDropdown ? "visible" : "hidden"
                }`}
                onClick={logout}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
