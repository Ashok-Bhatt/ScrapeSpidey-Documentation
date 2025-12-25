import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react"; // for external product links

function Footer() {
  return (
    <footer className="py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10">

        {/* Company */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="flex flex-col items-center space-y-2">
            <li>
              <Link to="/about" className="transition">
                About us
              </Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-4">Info</h4>
          <ul className="flex flex-col items-center space-y-2">
            <li>
              <Link to="/faqs" className="transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* API Resources */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-4">API Resources</h4>
          <ul className="flex flex-col items-center space-y-2">
            <li>
              <Link to="/docs" className="transition">
                Full documentation
              </Link>
            </li>
            <li>
              <Link to="/updates" className="transition">
                Updates
              </Link>
            </li>
          </ul>
        </div>

        {/* Other Products */}
        <div className="flex flex-col items-center">  
          <h4 className="text-lg font-semibold mb-4">Other Products</h4>
          <ul className="flex flex-col items-center space-y-2 mt-2">
            <li>
              <a
                href="https://query-forge-five.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition"
              >
                QueryForge <ExternalLink size={14} />
              </a>
            </li>
          </ul>
          <ul className="space-y-2 mt-2">
            <li>
              <a
                href="https://code-folio-insights.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition"
              >
                Codefolio <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Scrape Spidey. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;