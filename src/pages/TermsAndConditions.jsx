import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-4xl font-bold text-center  mb-6">
        Terms & Conditions
      </h1>

      <p className="">
        Welcome to Scrape Spidey. By using our platform, you agree to comply with
        the following terms and conditions. If you do not agree, please do not
        use the service.
      </p>

      <h2 className="text-2xl font-semibold mt-4">1. Service Disclaimer</h2>
      <p className="">
        Scrape Spidey provides tools to collect publicly available data from
        coding platforms such as LeetCode, GeeksforGeeks, and others. We do not
        guarantee continuous access to these platforms, nor do we guarantee the
        accuracy or completeness of the data collected.
      </p>

      <h2 className="text-2xl font-semibold mt-4">2. User Responsibility</h2>
      <p className="">
        Users are responsible for providing the correct usernames or links for
        scraping. Users must not use Scrape Spidey for any illegal activities or
        in violation of the terms of the third-party platforms.
      </p>

      <h2 className="text-2xl font-semibold mt-4">3. Third-Party Platforms</h2>
      <p className="">
        Scrape Spidey is not affiliated with, endorsed, or sponsored by any third-party
        coding platform. Users must comply with the terms of the original platforms
        while using our services.
      </p>

      <h2 className="text-2xl font-semibold mt-4">4. Limitation of Liability</h2>
      <p className="">
        Scrape Spidey is provided "as is" without any warranties. We are not liable
        for any damages, loss of data, or account issues resulting from the use
        of our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-4">5. Changes to Terms</h2>
      <p className="">
        We may update these terms periodically. Continued use of the platform
        constitutes acceptance of the updated terms.
      </p>

      <p className=" text-center mt-6">
        © {new Date().getFullYear()} Scrape Spidey. All rights reserved.
      </p>
    </div>
  );
};

export default TermsAndConditions;