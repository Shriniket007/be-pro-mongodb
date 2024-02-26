import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import logos from "../images/logo1.png";

const ChangePassword = () => {
  const user = useSelector((state) => state.usersReducer.user);
  //   console.log(user.Aadhar);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/change-password",
        {
          Aadhar: user.Aadhar,
          oldPassword,
          newPassword,
        }
      );
      console.log(response.data);
      alert("Password changes successfully!");
    } catch (error) {
      console.error("Error changing password:", error.response.data);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1E1E1E]">
      <div className="w-2/4 m-auto rounded-lg bg-[#393E46] drop-shadow-md">
        <h2 className="flex justify-center p-6 text-[#00ADB5] font-bold text-2xl">
          <img src={logos} alt="logo image" className="w-40 h-15" /> | Change
          Password
        </h2>
        <div className=" flex-1 m-4">
          <input
            className="border-2 border-black w-full p-2 placeholder-black mx-auto my-2"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            className="border-2 border-black w-full p-2 placeholder-black mx-auto my-2"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="border-2 border-black w-full p-2 placeholder-black mx-auto my-2"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-full p-2 bg-[#00ADB5] text-[#FFFFFF] font-bold text-xl rounded-b-lg"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
