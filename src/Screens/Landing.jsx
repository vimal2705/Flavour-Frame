import { useEffect, useState } from "react"
import logo from "../assets/images/flavour-frame-logo.jpg"
import closeMenu from "../assets/images/close.png"
import user from "../assets/images/user.png"
import menu from "../assets/images/menu.png"
import facebook from "../assets/images/facebook.png"
import apple from "../assets/images/Apple.png"
import google from "../assets/images/Google.png"
import pizzaImage from '../assets/images/pizza01.png';
import soupImage from '../assets/images/soup.png';
import fishImage from '../assets/images/fish.png';
import kalamariImage from '../assets/images/kalamari.png';
import {Link} from 'react-router-dom'
import $ from 'jquery'; 
import '../css/Index.css'
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"
import { auth } from "../config/call"
import { toast } from "react-toastify"


function Landing() {
  const navigation = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const token = localStorage.getItem("token");


    useEffect(() => {
        $(document).ready(function () {
            // When the burger menu icon is clicked
            $(".burgerMenu").on("click", function () {
              $("nav ul").addClass("active"); // Show the navigation menu
            });
    
            // When the close menu icon is clicked
            $(".closeMenu").on("click", function () {
              $("nav ul").removeClass("active"); // Hide the navigation menu
            });
    
            // When any list item in the nav is clicked
            $("nav ul li").on("click", function () {
              $("nav ul").removeClass("active"); // Hide the navigation menu
            });
          });
          $(document).ready(function() {
            // Show the popup when userMenu is clicked
            $('.userMenu').on('click', function() {
                $('.login-signup').addClass('active');
            });
        
            // Hide the popup when the backdrop (login-signup) is clicked
            $('.login-signup').on('click', function(event) {
                if (event.target === this) { // Check if the click is directly on the backdrop
                    $(this).removeClass('active');
                }
            });
        
            // Prevent clicks inside the login-signup-content from closing the popup
            $('.login-signup-content').on('click', function(event) {
                event.stopPropagation();
            });
        });
        $(document).ready(function() {
            var images = [
                pizzaImage,
                soupImage,
                fishImage,
                kalamariImage
            ];
          
            var currentIndex = 0; // Track the current image index
            var activeContainer = 1; // Track which container is active (1 or 2)
          
            // Initial setup: directly set the first image to the first background container
            $('#bg1').css('background-image', 'url(' + images[currentIndex] + ')').show();
          
            setInterval(function() {
              currentIndex = (currentIndex + 1) % images.length; // Move to the next image, loop back at the end
          
              var nextContainer = (activeContainer === 1) ? $('#bg2') : $('#bg1'); // Determine the next container
              var currentContainer = (activeContainer === 1) ? $('#bg1') : $('#bg2'); // Determine the current container
          
              // Set the next image on the next container and prepare it for fade-in
              nextContainer.css('background-image', 'url(' + images[currentIndex] + ')').fadeIn(1000, function() {
                // After fade-in, hide the previous container to prepare for the next switch
                currentContainer.hide();
                // Swap the active container indicator
                activeContainer = (activeContainer === 1) ? 2 : 1;
              });
          
            }, 3000); // Change image every 3 seconds
          });
          
      }, []);

      const responseMessage = (response) => {
        const { clientId, credential, } = response;
        const decoded = jwtDecode(credential);
        auth
          .singup({
            first_name: decoded.given_name,
            last_name: decoded.family_name,
            email: decoded.email,
            social_id: decoded.sub,
            fcm_token: "null",
          })
          .then(({ data }) => {
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 500);
          });
        // console.log("RESPONSE", response);
      };
    
      const errorMessage = (error) => {
        console.log(error);
      };

      const onGetStarted = () => {
        if (token) {
          navigation("\dashboard")
        }else{
          setLoginModal(!loginModal)
        }
      }

  return (
    <>
    <div className="oop">
    <header>
      <div className="container1 space-between">
        <img className="logo" src={logo} />
        <nav>
          <ul>
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
            <img style={{width:'64px'}} className="closeMenu" src={closeMenu} />
          </ul>
        </nav>
        <img className="userMenu" style={{width:'32px'}} src={user} onClick={()=>{
          console.log("clicked");
          setLoginModal(!loginModal)}} />
        <img
          className="burgerMenu"
          style={{width:'32px'}}
          src={menu}
          alt=""
        />
      </div>
    </header>
    <section className="hero">
      <section className="slide">
         <div className="background-container" id="bg1"></div>
  <div className="background-container" id="bg2" style={{display:"none"}}></div>
        <div className="slideContent">
          <h1>FlavorFrame</h1>
          <p>
            A platform for foodies to share their favorite recipes and discover
            new ones.
          </p>
          <button onClick={onGetStarted}>Get Started</button>
        </div>
      </section>
    </section>
   {loginModal && <section style={{
     width: '100vw',
     height: '100vh',
     position: 'fixed',
     top: '0px',
     left: '0px',
     background:" rgba(0, 0, 0, 0.8)",
     zIndex: 1000,
     display: "flex",
     justifyContent:'center',
     alignItems:'center'
   }}
   onClick={()=> setLoginModal(!loginModal)}
   >
      <div style={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '320px',
        background: "white",
        borderRadius: '1.2rem',
        margin: "auto",
        padding: '2rem',
        zIndex: 1001,
        flexDirection: "column",
        gap: "0.6rem",
      }}>
        <h1>Sign in</h1>
       
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </section>}
    </div>
    </>
  )
}

export default Landing

