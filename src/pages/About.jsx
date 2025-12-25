import React from "react";
import { Team, AboutCard } from "../components/export.js";
import { aboutInfo } from "../constants/index.jsx";
import { themeColors } from "../constants/classes.js";

const About = () => {

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Heading */}
      <h1 className={`text-4xl font-bold text-center ${themeColors.text}`}>
        About Scrape Spidey
      </h1>

      {/* Mission Section */}
      {aboutInfo.map((info) => (
        <AboutCard key={info.title} title={info.title} description={info.description} className="p-6 space-y-2" />
      ))}

      {/* Team Members Section */}
      <Team />

      {/* Footer */}
      <p className={`text-center mt-6 ${themeColors.secondary}`}>
        © {new Date().getFullYear()} Scrape Spidey. All rights reserved.
      </p>
    </div>
  );
};

export default About;