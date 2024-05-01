import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/Users";
import { baseURL } from "../App";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userProfile, SetuserProfile] = useState({
    fullName: "",
    Email: "",
    Telephone: "",
    Aadhar: "",
    Password: "",
    NewPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errfullName, setErrfullName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errTelephone, setErrTelephone] = useState("");
  const [errAadhar, setErrAadhar] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");

  useEffect(() => {
    // Validate and set errors whenever userProfile changes
    if (userProfile.fullName && !validateFullName(userProfile.fullName)) {
      setErrfullName(
        "Invalid full name. Please use only alphabets and spaces."
      );
    } else {
      setErrfullName("");
    }

    if (userProfile.Email && !validateEmail(userProfile.Email)) {
      setErrEmail("Invalid email address.");
    } else {
      setErrEmail("");
    }

    if (userProfile.Telephone && !validateTelephone(userProfile.Telephone)) {
      setErrTelephone("Invalid Telephone number.");
    } else {
      setErrTelephone("");
    }

    if (userProfile.Aadhar && !validateAadhar(userProfile.Aadhar)) {
      setErrAadhar("Invalid Aadhar number.");
    } else {
      setErrAadhar("");
    }

    if (userProfile.Password && !validatePassword(userProfile.Password)) {
      setErrPassword(
        "Password must be at least 8 characters with lowercase, uppercase, digits, and special characters."
      );
    } else {
      setErrPassword("");
    }

    if (userProfile.Password !== confirmPassword) {
      setErrCPassword("Passwords do not match.");
    } else {
      setErrCPassword("");
    }
  }, [userProfile, confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetuserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const validateTelephone = (telephone) => {
    return /^\d{10}$/.test(telephone);
  };

  const validateAadhar = (aadhar) => {
    return /^\d{12}$/.test(aadhar);
  };

  const validatePassword = (password) => {
    // Regex to check if password meets the criteria
    const strongPasswordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validateFullName = (fullName) => {
    return /^[A-Za-z ]+$/.test(fullName);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleClick = () => {
    // Check if any errors exist
    if (
      errfullName ||
      errEmail ||
      errTelephone ||
      errAadhar ||
      errPassword ||
      errCPassword
    ) {
      return;
    } else {
      // Check if all required fields are filled in
      if (
        !userProfile.fullName ||
        !userProfile.Email ||
        !userProfile.Telephone ||
        !userProfile.Aadhar ||
        !userProfile.Password ||
        !confirmPassword
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // If no errors and all fields are filled in, proceed with registration
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}/register`, userProfile);
      // console.log(response.data);

      if (response.data.success) {
        alert("Registration Successful");
        dispatch(setUserInfo(userProfile));
        navigate("/");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.log(error);

      console.error("Error during registration:", error);
      alert("Registration Failed", error);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1E1E1E]">
      <div className="w-full max-w-[800px] m-auto rounded-lg bg-[#393E46] drop-shadow-md p-10">
        <h2 className="flex justify-center p-6 text-[#00ADB5] font-bold text-2xl">
          Site name | Register
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-16">
          <div className="relative">
            <input
              onChange={handleChange}
              className="border-2 border-black w-full m-auto placeholder-black p-1"
              type="text"
              name="fullName"
              required
              placeholder="FULL NAME"
            />
            {errfullName && <p className="text-red-500 mt-1">{errfullName}</p>}
          </div>

          <div className="relative">
            <input
              onChange={handleChange}
              className="border-2 border-black w-full m-auto placeholder-black p-1"
              type="email"
              name="Email"
              required
              placeholder="EMAIL"
            />
            {errEmail && <p className="text-red-500 mt-1">{errEmail}</p>}
          </div>

          <div className="relative">
            <input
              onChange={handleChange}
              className="border-2 border-black w-full m-auto placeholder-black p-1"
              type="tel"
              name="Telephone"
              required
              placeholder="TELEPHONE"
            />
            {errTelephone && (
              <p className="text-red-500 mt-1">{errTelephone}</p>
            )}
          </div>

          <div className="relative">
            <input
              onChange={handleChange}
              className="border-2 border-black w-full m-auto placeholder-black p-1"
              type="text"
              name="Aadhar"
              required
              placeholder="AADHAR NUMBER"
            />
            {errAadhar && <p className="text-red-500 mt-1">{errAadhar}</p>}
          </div>

          <div className="relative">
            <input
              onChange={handleChange}
              className="border-2 border-black w-full m-auto placeholder-black p-1"
              type="password"
              name="Password"
              required
              placeholder="NEW PASSWORD"
            />
            {errPassword && <p className="text-red-500 mt-1">{errPassword}</p>}
          </div>

          <div className="relative">
            <input
              onChange={handleConfirmPasswordChange}
              className="border-2 border-black w-full m-auto placeholder-black p-1"
              type="password"
              name="NewPassword"
              required
              placeholder="CONFIRM PASSWORD"
            />
            {errCPassword && (
              <p className="text-red-500 mt-1">{errCPassword}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleClick}
          type="submit"
          className="w-full mt-6 p-2 bg-[#00ADB5] text-[#FFFFFF] font-bold text-xl rounded-b-lg"
        >
          Register
        </button>
      </div>
      <p className="text-center text-[#FFFFFF] mb-2 font-bold">
        Already registered? | Sign Up
      </p>
    </div>
  );
}

export default Register;
