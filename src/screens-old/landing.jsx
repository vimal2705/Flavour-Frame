import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { common } from "../config/call";
import Placeholderimg from "../assets/img/preloader-img.png";
import Heroshapeleft from "../assets/img/hero-shape-left.webp";
import Heroshaperight from "../assets/img/hero-shape-right.webp";
import Heroshaperight1 from "../assets/img/hero-shape-ring-1.png";
import Heroshaperight2 from "../assets/img/hero-shape-ring-2.png";
import burger from "../assets/burger.png";
import pizza from "../assets/pizza.jpeg";
import frenchfries from "../assets/FrenchFries.jpeg"
import panipuri from "../assets/PaniPuri.jpeg"
import sandwich from "../assets/sandwich.jpg"
import pizza1 from "../assets/pizza1.jpeg"
import pasta from "../assets/pasta.jpeg";
import springroll from "../assets/springRoll.jpeg"
import burger3 from "../assets/burger3.jpg"
import dessert from "../assets/desserts.jpeg"
import momos from "../assets/momos.jpg"
const LandingScreen = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);


  const token = localStorage.getItem("token");

  const submitReq = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
        navigate("/home",);
     
    }
  };

  const fetchListing = () => {
    common.getListing().then(({ data }) => {
      setData(data.data);
    });
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <div>
    
    <div className="fullWidthContainer">
      <div className="sideNavigation">
        <img className="dashboardLogo" src="assets/images/flavour-frame-logo.jpg" />
        <ul>
          <li>
            <img src="assets/images/gallery.png" /><a href="#">Generate</a>
          </li>
          <li className="active">
            <img src="assets/images/collection.png" /><a href="#">Collecitons</a>
          </li>
          <li>
            <img src="assets/images/gallery.png" /><a href="#">Gallery</a>
          </li>
        </ul>
        <div className="userDetails">
          <span className="userIcon">JP</span>
          Jitendra Puri
          <img className="logoutIcon" src="assets/images/logout.png" />
        </div>
      </div>
      <div className="contentContainer">
        <div className="contentHeader">
          <h1>Collections</h1>
        </div>
        <div className="toolBarHeader">
          <input className="searchTextBox" type="text" placeholder="search" />
          <div className="buttonSection">
            <button><img src="assets/images/add.png" /> Add Collection</button>
            <button><img src="assets/images/csv.png" /> Download CSV</button>
          </div>
        </div>
        <div className="collectionGrid">
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Wonderfull Italian Pizza and Other Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
          <div className="collectionItem">
            <input className="selectedCollection" type="checkbox" />
            <span className="collectionNumber">100</span>
            <ul className="imageGrid">
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
              <li><img src="assets/images/slider-bg01.png" alt="" /></li>
            </ul>
            <span className="itemName">Italian Food</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LandingScreen;
