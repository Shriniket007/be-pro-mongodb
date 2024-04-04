import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logos from "../images/logo1.png";

function Navbar() {
  // const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const handleSignIn = () => {
  //   navigate("/Login");
  // };

  // const handleSignUp = () => {
  //   navigate("/Register");
  // };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // const closeMobileMenu = () => {
  //   setMobileMenuOpen(false);
  // };

  return (
    <div className="relative">
      <nav className="flex items-center justify-between bg-[#393E46] p-2">
        <div className="flex items-center">
          <Link to="/">
            <img src={logos} alt="logo image" className="w-60 h-25" />
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            className="text-[#EEEEEE] focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <div className="hamburger-icon">
              <span className="block h-0.5 w-8 bg-white mb-2"></span>
              <span className="block h-0.5 w-8 bg-white mb-2"></span>
              <span className="block h-0.5 w-8 bg-white"></span>
            </div>
          </button>
        </div>

        {/* Desktop View Buttons */}
        <div className="hidden lg:flex items-center">
          <Link
            className="bg-[#00ADB5] text-[#EEEEEE] p-2 rounded-md font-bold mr-8"
            to={"/Login"}
          >
            Sign In
          </Link>

          <Link
            className="bg-[#00ADB5] text-[#EEEEEE] p-2 rounded-md font-bold mr-4"
            to={"/Register"}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="backdrop-blur-md p-2 absolute top-full left-0 right-0 flex flex-col z-50">
          {/* Mobile Menu Buttons */}
          <div className="backdrop-blur-md p-4 flex flex-col items-center">
            <Link
              className="bg-[#00ADB5] text-[#EEEEEE]  px-4 py-2 rounded mb-2 font-bold  w-[150px]"
              to={"/login"}
            >
              Sign In
            </Link>

            <Link
              className="bg-[#00ADB5] text-[#EEEEEE]  px-4 py-2 rounded mb-2 font-bold  w-[150px]"
              to={"/register"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
