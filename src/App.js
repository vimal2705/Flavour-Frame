import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cursor from "./components/Cursor";
import { BrowserRouter } from "react-router-dom";
import Container from "./Screens/UserStack";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div>
          <Container />
          <ToastContainer
            theme="colored"
            position="bottom-center"
            hideProgressBar
          />
        </div>
      
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
