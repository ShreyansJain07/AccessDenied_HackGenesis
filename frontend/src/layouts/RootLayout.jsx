import React from "react";
import VoiceButton from "../components/VoiceButton";
import SpeechSynthesizer from "../components/SpeechSynthesizer";
import CustomCursor from "../components/CustomCursor";

import { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"

export default function RootLayout() {

  return (
    <>
    <Navbar/>
      {/* <Carousel/>
      <FeatureList/> */}
      {/* <SpeechSynthesizer/> */}
      <Outlet/>
      <Footer />

    </>
  );
}
