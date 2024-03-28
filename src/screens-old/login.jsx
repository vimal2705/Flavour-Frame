import React, {  useState } from "react";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import burger from "../assets/burger.jpg";
import AppleIcon from "@mui/icons-material/Apple";
import { GoogleLogin } from "@react-oauth/google";
import AppleLogin from "react-apple-login";
import { auth } from "../config/call";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// const LoginScreen = () => {
  // const responseMessage = (response) => {
  //   const { clientId, credential, } = response;
  //   const decoded = jwtDecode(credential);
  //   console.log("🚀 - responseMessage - decoded:", decoded);
  //   auth
  //     .singup({
  //       first_name: decoded.given_name,
  //       last_name: decoded.family_name,
  //       email: decoded.email,
  //       social_id: decoded.sub,
  //       fcm_token: "null",
  //     })
  //     .then(({ data }) => {
  //       console.log(decoded);
  //       toast.success(data.message);
  //       localStorage.setItem("token", data.token);
  //       setTimeout(() => {
  //         window.location.href = "/";
  //       }, 500);
  //     });
  //   // console.log("RESPONSE", response);
  // };

  // const errorMessage = (error) => {
  //   console.log(error);
  // };

//   const handleAppleLoginSuccess = (response) => {
//     // Handle successful login response here
//     console.log("Successful Apple login:", response);
//     // You can perform further actions like updating state, making API calls, etc.
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) window.location.href = "/";
//   }, []);
//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-gray-100">
//     //   <div
//     //     className="max-w-md md:max-w-4xl md:h-[30rem]  space-y-8 p-6 bg-white rounded-lg shadow-lg grid md:grid-cols-2"
//     //     onClick={onSubmit}
//     //   >
//     //     <div className="md:grid md:content-center">
//     //       <img src={burger} className="text-center " //>
//     //     </div>

//     //     <div className="md:grid md:content-center">
//     //       <h2 className="text-3xl  text-center text-gray-900">
//     //         <span className="font-extrabold">flavour</span>frame
//     //       </h2>

//     //       <div className="mt-8 space-y-6">
//     //         {/* <button
//     //           type="button"
//     //           className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//     //           onClick={() => onSubmit("GOOGLE")}
//     //         >
//     //           <GoogleIcon className="mr-2" />
//     //           Sign in with Google
//     //         </button> */}
//     //         <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

//     //         {/* <button
//     //           type="button"
//     //           className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//     //           onClick={() => onSubmit("APPLE")}
//     //         >
//     //           <AppleIcon className="mr-2" />
//     //           Sign in with Apple
//     //         </button> */}
//     //         <AppleLogin
//     //           clientId="com.react.apple.login"
//     //           redirectURI="https://redirectUrl.com"
//     //           onSuccess={handleAppleLoginSuccess}
//     //           onFailure={(error) => console.error("Apple login failed:", error)}
//     //         />
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="bg-black body-clip">
//       <div class="login-page">
//         <div class="container">
//           <div class="row justify-content-center align-items-center">
//             <div class="col-xxl-7 col-xl-6 d-none d-xl-block">
//               <div class="radar-main-wrapper">
//                 <div class="radar-main-circle-one"></div>
//                 <div class="radar-main-circle-two"></div>
//                 <div class="radar-main-circle-three"></div>
//                 <img
//                   src="assets/img/login-shape-circle-text.png"
//                   alt="image"
//                   class="img-fluid radar-main-shape-text"
//                 />
//                 <div class="radar-logo-wrapper">
//                   <div class="radar">
//                     <div class="animated-text-wrapper">
//                       <p class="cd-headline slide mb-0">
//                         <span class="cd-words-wrapper">
//                           <b class="is-hidden">WriteBot AI</b>
//                           <b class="is-hidden">WriteBot AI</b>
//                           <b class="is-visible">WriteBot AI</b>
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <div class="logo-wrapper d-flex justify-content-center align-items-center">
//                     <img
//                       src="assets/img/hero-7-logo.png"
//                       alt="image"
//                       class="img-fluid hero-7-logo"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="col-xxl-5 col-xl-6 col-lg-8 col-md-10">
//               <div class="gradient-card py-sm-12 py-8 px-sm-8 px-5 rounded-5 pb-[50px]">
//                 <p class="fs-24 fw-medium clr-neutral-80 mb-5">Welcome !</p>
//                 <h4 class="h4 fw-bold mb-2 clr-neutral-90">Sign in to </h4>
//                 <form>
//                   <div class="flex flex-col w-full gap-xl-6 gap-4 align-items-center justify-content-center mt-6 pb-8">
//                     <GoogleLogin
//                       width={300}
//                       onSuccess={responseMessage}
//                       onError={errorMessage}
//                     />
//                     {/* <div className="bg-black rounded-lg p-2">
//                       <AppleLogin
//                         designProp={{ width: 300 }}
//                         clientId="com.react.apple.login"
//                         redirectURI="https://redirectUrl.com"
//                         onSuccess={handleAppleLoginSuccess}
//                         onFailure={(error) =>
//                           console.error("Apple login failed:", error)
//                         }
//                       />
//                     </div> */}
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div class="login-copyright">
//             <p class="mb-0 text-center clr-neutral-80">
//               Copyright @2023 <span class="clr-white">Writebot</span>
//             </p>
//           </div>
//         </div>
//         <img
//           src="assets/img/login-shape-top.png"
//           alt="image"
//           class="img-fluid login-shape login-shape-top"
//         />
//         <img
//           src="assets/img/login-shape-left.png"
//           alt="image"
//           class="img-fluid login-shape login-shape-left"
//         />
//         <img
//           src="assets/img/login-shape-right.png"
//           alt="image"
//           class="img-fluid login-shape login-shape-right"
//         />
//         <img
//           src="assets/img/login-shape-line-left.png"
//           alt="image"
//           class="img-fluid login-shape login-shape-line-left"
//         />
//         <img
//           src="assets/img/login-shape-line-right.png"
//           alt="image"
//           class="img-fluid login-shape login-shape-line-right"
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;


import { useEffect } from "react"
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
import './login.css'
function LoginScreen() {

  const responseMessage = (response) => {
        const { clientId, credential, } = response;
        const decoded = jwtDecode(credential);
        console.log("🚀 - responseMessage - decoded:", decoded);
        auth
          .singup({
            first_name: decoded.given_name,
            last_name: decoded.family_name,
            email: decoded.email,
            social_id: decoded.sub,
            fcm_token: "null",
          })
          .then(({ data }) => {
            console.log(decoded);
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          });
        // console.log("RESPONSE", response);
      };
    

        const errorMessage = (error) => {
    console.log(error);
  };

  const handleAppleLoginSuccess = (response) => {
    // Handle successful login response here
    console.log("Successful Apple login:", response);
    // You can perform further actions like updating state, making API calls, etc.
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/";
  }, []);
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

  return (
    <>
    <header>
      <div className="container space-between">
        <img className="logo" src={logo} />
        <nav>
          <ul>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <img style={{width:'64px'}}className="closeMenu" src={closeMenu} />
          </ul>
        </nav>
        <img className="userMenu"  style={{width:'32px'}} src={user} />
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
          <button>Get Started</button>
        </div>
      </section>
    </section>
    <section className="login-signup">
      <div className="login-signup-content">
        <h1>Sign in</h1>
        <button  className="facebook">
          <img src={facebook} /> Sing in with Facebook
        </button>
        <button className="apple">
          <img src={apple} /> Sing in with Apple
        </button>
        <GoogleLogin
                      width={300}
                      onSuccess={responseMessage}
                      onError={errorMessage}
                    />
      </div>
    </section>
    </>
  )
}

export default LoginScreen;
