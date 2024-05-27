import React from "react";
import { Link } from "react-router-dom";
import icon1 from "../../src/images/aadhaar.svg";
import icon2 from "../../src/images/compliant.png";
import icon3 from "../../src/images/folder.png";
import icon4 from "../../src/images/blockchain.png";

function AboutUs() {
  return (
    <div className="container mx-auto text-center ">
      <h1 className="text-5xl font-bold mb-16 text-gray-300 mt-4">
        Crypt Drive
      </h1>

      <p className="text-lg leading-relaxed mb-8 text-gray-300 text-justify mx-16">
        Crypt Drive is a cutting-edge document storage solution leveraging
        blockchain technology for enhanced security and accessibility. This
        innovative platform is designed to redefine decentralized data
        management, placing privacy at the forefront. Users experience a
        seamless and secure way to control their documents, offering
        unparalleled privacy and management capabilities.
      </p>

      <p className="text-lg leading-relaxed mb-8 text-gray-300 text-justify mx-16">
        At the heart of Crypt Drive is a robust backend built on Node.js and
        MySQL, ensuring reliable and scalable performance. The server
        facilitates user registration and login processes with encrypted
        password handling, incorporating bcrypt for advanced security. The
        system employs a user-friendly interface, making document storage and
        retrieval intuitive, and a sleek frontend designed with React for a
        seamless user experience.
      </p>

      <p className="text-lg leading-relaxed mb-8 text-gray-300 text-justify mx-16">
        Crypt Drive document preview feature enhances the user experience,
        allowing individuals to visualize their uploaded documents directly
        within the platform. This functionality streamlines the process of
        verifying and accessing documents, making it an ideal solution for users
        who prioritize efficiency in managing their digital assets.
      </p>
      <h1 className="text-5xl font-bold mb-16 text-teal-500 mt-4">
        Why Choose Us?
      </h1>

      <h1 className="text-3xl font-bold mb-16 text-blue-300 mt-4">
        Our Services
      </h1>

      <div className="flex flex-col lg:flex-row justify-center mb-12">
        <div className="mx-6 text-center">
          <img
            src={icon2}
            alt="Icon 2"
            className="w-15 h-20 object-cover  border-00ADB5 mb-4 mx-auto"
          />
          <p className="text-lg font-bold text-gray-200">
            Secure document storage
          </p>
        </div>
        <div className="mx-6 text-center">
          <img
            src={icon1}
            alt="Icon 1"
            className="w-15 h-20 object-cover border-00ADB5 mb-4 mx-auto"
          />
          <p className="text-lg font-bold text-gray-200">
            Authentication using Aadhar
          </p>
        </div>

        <div className="mx-6 text-center">
          <img
            src={icon3}
            alt="Icon 3"
            className="w-15 h-20 object-cover  border-00ADB5 mb-4 mx-auto"
          />
          <p className="text-lg font-bold text-gray-200">
            Secure document sharing
          </p>
        </div>

        <div className="mx-6 text-center">
          <img
            src={icon4}
            alt="Icon 1"
            className="w-15 h-20 object-cover  border-00ADB5 mb-4 mx-auto"
          />
          <p className="text-lg font-bold text-gray-200">
            Blockchain technology
          </p>
        </div>
      </div>

      <div className=" p-8 bg-[#1E1E1E] shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-300">
          We Will Be Happy to Provide You Services
        </h1>
        <h3 className="text-lg font-bold mb-8 text-gray-300">
          Please connect with us and make your documents more secure.
        </h3>

        <div className="flex justify-center space-x-4">
          <button className="bg-teal-500 text-white py-2 px-4 rounded-md font-bold border-light-blue-700 hover:bg-light-blue-700 transition duration-300 ease-in-out">
            <Link to="/contact"> Contact Us</Link>
          </button>

          <button className="bg-teal-500 text-white py-2 px-4 rounded-md font-bold border-light-blue-700 hover:bg-light-blue-700 transition duration-300 ease-in-out">
            <Link to="/register"> Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
