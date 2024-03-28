import { useEffect } from "react";
import $ from "jquery";
import {Link} from 'react-router-dom'
import dashboardLogo from "../assets/images/flavour-frame-logo.jpg";
import generateImage from "../assets/images/generate-image.png";
import collectionIcon from "../assets/images/collection.png";
import galleryIcon from "../assets/images/gallery.png";
import logoutIcon from "../assets/images/logout.png";
import uploadImageIcon from "../assets/images/uploadimage.png";

import "../css/Dashboard.css"

const  Gallery = () => {
  useEffect(() => {
    $(document).ready(function () {
      // Toggle checkbox within .collectionItem on click
      $(".collectionItem").click(function (event) {
        // Prevent the event from immediately propagating to .collectionItem
        if (!$(event.target).is("input:checkbox")) {
          var checkbox = $(this).find(".selectedCollection");
          checkbox.prop("checked", !checkbox.prop("checked"));

          // Add or remove class based on checkbox state
          $(this).toggleClass(
            "highlightedCollection",
            checkbox.prop("checked")
          );
        }
      });

      // Change class based on checkbox state without clicking on .collectionItem
      $(".selectedCollection").change(function () {
        $(this)
          .closest(".collectionItem")
          .toggleClass("highlightedCollection", this.checked);
      });
    });

    $(document).ready(function () {
      var sideNavTop = $(".sideNavigation").offset().top; // Initial top position
      var contentHeaderTop = $(".contentHeader").offset().top; // Adjust accordingly
      var toolBarHeaderTop = $(".toolBarHeader").offset().top; // Adjust accordingly

      $(window).scroll(function () {
        var currentScroll = $(window).scrollTop();

        if (currentScroll >= sideNavTop) {
          $(".sideNavigation").addClass("fixed-top");
        } else {
          $(".sideNavigation").removeClass("fixed-top");
        }

        if (currentScroll >= contentHeaderTop) {
          $(".contentHeader").addClass("fixed-top");
        } else {
          $(".contentHeader").removeClass("fixed-top");
        }

        if (currentScroll >= toolBarHeaderTop) {
          $(".toolBarHeader").addClass("fixed-top");
        } else {
          $(".toolBarHeader").removeClass("fixed-top");
        }
      });
    });
  }, []);

  return (
    <div className="fullWidthContainer">
      <div className="sideNavigation">
        <img className="dashboardLogo" src={dashboardLogo} alt="Dashboard Logo" />
        <ul>
          <li >
            <img src={generateImage} alt="Generate Icon" /><Link to="/generate">Generate</Link>
          </li>
          <li>
            <img src={collectionIcon} alt="Collections Icon" /><Link to="/dashboard">Collections</Link>
          </li>
          <li className="active">
            <img src={galleryIcon} alt="Gallery Icon" /><a href="#">Gallery</a>
          </li>
        </ul>
        <div className="userDetails">
          <span className="userIcon">JP</span>
          Jitendra Puri
          <img className="logoutIcon" src={logoutIcon} alt="Logout Icon" />
        </div>
      </div>
      <div className="contentContainer">
        <div className="generateImageContainer">
          <span>Gallery</span>
          <input
            type="text"
            placeholder="Try 'Pizza with glass of beer on side'"
          />
          <img src={uploadImageIcon} alt="Upload Image Icon" />
          <button>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
