// UploadFile.js
import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function UploadFile() {
  const user = useSelector((state) => state.usersReducer.user);
  const fileInputRef = useRef();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(`Uploading file: ${file.name}`);
      setUploadedFileName(file.name);

      try {
        const fileContent = await readFileAsBase64(file);
        const response = await uploadToIpfs(fileContent, file.name); // Pass the file name

        alert("File uploaded to IPFS");
        setSelectedDocument(response.ipfsPath);
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    } else {
      console.log("No file selected");
      setUploadedFileName("");
      setSelectedDocument(null);
    }
  };

  const [preview, setPreview] = useState(false);
  const handlePreview = () => {
    setPreview(true);
    console.log("Previewing file");
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const uploadToIpfs = async (fileContent, fileName) => {
    try {
      const file = fileInputRef.current.files[0];
      const fileSizeKB = file.size / 1000;

      const response = await axios.post("http://localhost:3001/uploadToIpfs", {
        fileContent,
        userAadhar: user.Aadhar,
        fileName,
        fileSizeKB,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error uploading to IPFS");
    }
  };

  return (
    <div className="grid grid-cols-10 gap-4 h-screen pt-4 pb-4 bg-[#1A2027]">
      <div className="col-span-5 h-500 p-2 bg-[#1A2027] text-[#222831] shadow-md flex flex-col justify-center items-center ">
        <h1 className="text-white text-lg font-bold mb-4">Upload Document</h1>
        <button
          className="bg-teal-500 text-white border border-white px-4 py-2 rounded w-80 mb-2"
          onClick={handleUpload}
        >
          Upload File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <h3 className="text-white px-4 py-2">.pdf, .jpg, .png files</h3>
        <button
          className="bg-teal-500 text-white border border-white px-4 py-2 rounded w-80 mt-4"
          onClick={handlePreview}
        >
          Preview File
        </button>
        <h3 className="text-white px-4 py-2">View Uploaded Files</h3>
        {uploadedFileName && (
          <p className="mt-4 text-lg text-white">
            Uploaded file: {uploadedFileName}
          </p>
        )}
      </div>

      <div className="col-span-5 h-500 p-2 bg-[#222831] text-[#EEEEEE] font-bold">
        <h1>Document Preview</h1>
        {preview && selectedDocument && (
          <iframe
            src={selectedDocument.previewUrl}
            title="Document Preview"
            width="100%"
            height="95%"
            style={{ border: "none" }}
            scrolling="auto"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default UploadFile;
