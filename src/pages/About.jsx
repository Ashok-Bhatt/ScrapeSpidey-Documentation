import React from "react";
import { teamMembers } from "../constants";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center">
        About Scrape Spidey
      </h1>

      {/* Mission Section */}
      <div className="rounded-lg p-6 shadow-md space-y-2">
        <h2 className="text-2xl font-semibold">Who We Are</h2>
        <p className="">
          Scrape Spidey is your go-to platform for extracting web data effortlessly.
          We help developers, analysts, and businesses access the information they need
          quickly and reliably, without the hassle of manual scraping.
        </p>
      </div>

      {/* Vision Section */}
      <div className="rounded-lg p-6 shadow-md space-y-2">
        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p className="">
          Our vision is to make web data accessible to everyone. We aim to empower
          users with tools that are intuitive, fast, and reliable — turning the web
          into a playground of insights.
        </p>
      </div>

      {/* What We Do Section */}
      <div className="rounded-lg p-6 shadow-md space-y-2">
        <h2 className="text-2xl font-semibold">What We Do</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Provide user-friendly web scraping tools</li>
          <li>Enable automated data extraction from multiple websites</li>
          <li>Offer analytics-ready data in structured formats</li>
        </ul>
      </div>

      {/* Team Members Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl text-center flex flex-col"
              style={{ width: "260px", minWidth: "220px", maxWidth: "100%" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-1 bg-blue-600 rounded hover:bg-blue-700"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center mt-6">
        © {new Date().getFullYear()} Scrape Spidey. All rights reserved.
      </p>
    </div>
  );
};

export default About;