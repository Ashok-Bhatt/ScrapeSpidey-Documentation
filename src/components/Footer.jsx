import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react"; // for external product links

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Info</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faqs" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* API Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">API Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/docs" className="hover:text-white transition">
                Full documentation
              </Link>
            </li>
            <li>
              <Link to="/updates" className="hover:text-white transition">
                Updates
              </Link>
            </li>
          </ul>
        </div>

        {/* Other Products */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Other Products</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://queryforge.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition"
              >
                QueryForge <ExternalLink size={14} />
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