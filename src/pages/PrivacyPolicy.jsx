import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-4xl font-bold text-center  mb-6">
        Privacy Policy
      </h1>

      <p className="">
        At Scrape Spidey, we respect your privacy. This Privacy Policy explains
        what data we collect, how we use it, and your rights as a user.
      </p>

      <h2 className="text-2xl font-semibold mt-4">1. Data Collection</h2>
      <p className="">
        Scrape Spidey only collects data that is publicly available on third-party
        coding platforms (like LeetCode, GeeksforGeeks, etc.). We do not access
        any private or password-protected data.
      </p>

      <h2 className="text-2xl font-semibold mt-4">2. How We Use the Data</h2>
      <p className="">
        Collected data is used solely to provide the scraping service and analytics
        to users. We do not sell or share user data with external parties.
      </p>

      <h2 className="text-2xl font-semibold mt-4">3. Cookies & Analytics</h2>
      <p className="">
        We may use cookies or analytics tools to improve the platform’s performance
        and track usage patterns. No personally identifiable information is
        collected through these tools.
      </p>

      <h2 className="text-2xl font-semibold mt-4">4. User Responsibility</h2>
      <p className="">
        Users are responsible for providing correct usernames or links and ensuring
        that their use of Scrape Spidey complies with third-party platform policies.
      </p>

      <h2 className="text-2xl font-semibold mt-4">5. Updates to Policy</h2>
      <p className="">
        We may update this Privacy Policy from time to time. Continued use of the
        platform constitutes acceptance of any updates.
      </p>

      <p className=" text-center mt-6">
        © {new Date().getFullYear()} Scrape Spidey. All rights reserved.
      </p>
    </div>
  );
};

export default PrivacyPolicy;