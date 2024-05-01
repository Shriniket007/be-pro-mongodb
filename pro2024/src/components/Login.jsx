import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/Users";
import { baseURL } from "../App";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables for input values and potential error messages
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errAadhar, setErrAadhar] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // Validate Aadhar number
  useEffect(() => {
    if (aadharNumber && !validateAadhar(aadharNumber)) {
      setErrAadhar("Invalid Aadhar number.");
    } else {
      setErrAadhar("");
    }
  }, [aadharNumber]);

  // Validate Password
  useEffect(() => {
    if (password && !validatePassword(password)) {
      setErrPassword(
        "Password must be at least 8 characters with lowercase, uppercase, digits, and special characters."
      );
    } else {
      setErrPassword("");
    }
  }, [password]);

  // Validation logic functions
  const validateAadhar = (aadhar) => {
    return /^\d{12}$/.test(aadhar);
  };

  const validatePassword = (password) => {
    // Regex to check if password meets the criteria
    const strongPasswordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateAadhar(aadharNumber)) {
      setErrAadhar("Invalid Aadhar number.");
      return;
    } else {
      setErrAadhar("");
    }

    if (!validatePassword(password)) {
      setErrPassword(
        "Password must be at least 8 characters with lowercase, uppercase, digits, and special characters."
      );
      return;
    } else {
      setErrPassword("");
    }

    try {
      const response = await axios.post(`${baseURL}/login`, {
        Aadhar: aadharNumber,
        Password: password,
      });

      if (response.data.success) {
        alert("Login Successful");
        dispatch(setUserInfo(response.data.user));
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1E1E1E]">
      <div className="w-3/4 m-auto rounded-lg bg-[#393E46] drop-shadow-md">
        <h2 className="flex justify-center p-6 text-[#00ADB5] font-bold text-2xl">
          Site Name | Login
        </h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-16">
            <div className="mb-4">
              <input
                className="border-2 border-black w-full p-2 placeholder-black"
                type="text"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                required
                placeholder="AADHAR NUMBER"
              />
              {errAadhar && <p className="text-red-500 mt-1">{errAadhar}</p>}
            </div>
            <div className="mb-4">
              <input
                className="border-2 border-black w-full p-2 placeholder-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="PASSWORD"
              />
              {errPassword && (
                <p className="text-red-500 mt-1">{errPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#00ADB5] text-[#FFFFFF] font-bold text-xl rounded-b-lg"
          >
            Login
          </button>
        </form>
      </div>
      <p className="text-center text-[#FFFFFF] font-bold mb-2">
        Forgot password?
      </p>
    </div>
  );
}

export default Login;
