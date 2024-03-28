import React from "react";
import LoginScreen from "./login";
import LandingScreen from "./landing";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./home";
import DetailScreen from "./detail";
import SettingScreen from "./setting";
import KeywordScreen from "./keyword";

const Container = () => {
  return (
 
      <Routes>
        <Route>
          <Route path="/login" element={<LandingScreen />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/detail" element={<DetailScreen />} />
          <Route path="/keyword" element={<KeywordScreen />} />
          <Route path="/setting" element={<SettingScreen />} />
        </Route>
      </Routes>
  
  );
};

export default Container;
