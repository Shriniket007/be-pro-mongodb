import React from 'react'
import {Link, useNavigate } from 'react-router-dom';
import logos from '../images/logo1.png';

function Navbar() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/Login'); 
  };

  const handleSignUp = () => {
    navigate('/Register');
  };
  return (
    <nav className="flex items-center justify-between bg-[#393E46] p-2">
      <div className="flex items-center "> 
        <Link to="/">
          <img 
            src={logos}
            alt="logo image"
            className="w-80 h-30 "
            >
          </img>
        </Link>
        {/* <div className="text-[#EEEEEE]">Crypt Drive</div> */}
      </div>


  <div className="flex items-center">
    {/* Button 1 */}
    <button
      className="bg-[#00ADB5] text-[#EEEEEE] p-2 rounded-md font-bold mr-8"
      onClick={handleSignIn}
    >
      Sign In
    </button>

    {/* Button 2 */}
    <button
      className="bg-[#00ADB5] text-[#EEEEEE] p-2 rounded-md font-bold mr-4"
      onClick={handleSignUp}
    >
      Sign Up
    </button>
  </div>

    </nav>
  )
}

export default Navbar