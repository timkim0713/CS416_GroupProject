import React from "react";
import HeroSection from "../../HeroSection";
import { aboutUs, virtualStore } from "./Data";

function AboutUs() {
  return (
    <>
      <HeroSection {...aboutUs} />
      <HeroSection {...virtualStore} />
    </>
  );
}

export default AboutUs;
