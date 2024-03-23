import React from "react";
import Container from "./screens";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Container />
      <ToastContainer
        theme="colored"
        position="bottom-center"
        hideProgressBar
      />
    </div>
  );
}

export default App;
