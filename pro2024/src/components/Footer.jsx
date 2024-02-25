import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons as needed
import logos from "../images/logo1.png";

function Footer() {
  return (
    <footer className="bg-[#393E46] text-white p-8">
      <div className="flex justify-between items-center">
        {/* Logo on the left */}
        <div className="text-4xl font-bold mb-2">
          {/* Make the logo a Link */}
          <Link to="/">
            <img src={logos} alt="logo image" className="w-80 h-30 "></img>
          </Link>
        </div>

        {/* Description in the middle */}
        <div className="text-gray-100 text-justify w-1/3">
          {" "}
          {/* Set a fixed width */}
          Revolutionizing document storage with blockchain for secure,
          accessible data. Experience the future of decentralized management
          with privacy at its core. Your documents, your control.
        </div>

        {/* Social Media Icons and Navigation Links on the right */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <a href="#" className="text-2xl mr-2 text-teal-500">
              <FaFacebook />
            </a>
            <span className="text-teal-500">Facebook</span>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-2xl mr-2 text-teal-500">
              <FaTwitter />
            </a>
            <span className="text-teal-500">Twitter</span>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-2xl mr-2 text-teal-500">
              <FaInstagram />
            </a>
            <span className="text-teal-500">Instagram</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-teal-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-teal-500">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/services" className="text-teal-500">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-teal-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-300 text-lg">
        © Copyright Crypt Drive 2024. All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
