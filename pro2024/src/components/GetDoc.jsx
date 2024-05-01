import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import aadhar from "../../src/images/aadhaar_pro.svg";
import gmail from "../../src/images/gmail.svg";
import phone from "../../src/images/phone.svg";
import { baseURL } from "../App";

const GetDoc = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [approvedDocuments, setApprovedDocuments] = useState([]);

  const [password, setPassword] = useState(""); // State to store user input password
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [error, setError] = useState(null);
  const user = useSelector((state) => state.usersReducer.user);

  useEffect(() => {
    fetch(`${baseURL}/getDocuments/${user.Aadhar}`)
      .then((response) => response.json())
      .then((data) => {
        setDocumentList(data);
      })
      .catch((error) => setError(error.message));

    fetch(`${baseURL}/getApprovedDocuments`)
      .then((response) => response.json())
      .then((data) => {
        const userApprovedDocuments = data.filter(
          (doc) => doc.requesterAadhar === user.Aadhar
        );
        // setApprovedDocuments(userApprovedDocuments);
        setApprovedDocuments(userApprovedDocuments);
        // console.log(userApprovedDocuments[0].documentId.ipfsPath)
      })
      .catch((error) => setError(error.message));

    // fetch(`${baseURL}/getSmartContractDocuments/${user.Aadhar}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // setDocumentList(data);
    //   })
    //   .catch((error) => setError(error.message));
  }, [user.Aadhar]);

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
    setShowPasswordInput(
      approvedDocuments.some((doc) => doc.documentId === document)
    ); // Show password input when document is selected
    // console.log(document)
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch(`${baseURL}/verifyPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadhar: user.Aadhar, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Password is correct, proceed to preview document
        setShowPasswordInput(false); // Hide password input after successful verification

        setSelectedDocument(selectedDocument);
      } else {
        // Password is incorrect
        setError("Incorrect password");
      }
    } catch (error) {
      setError("Error verifying password");
    }
  };

  const calculateFilType = (file) => {
    if (!file) {
      return { type: "N/A" };
    }

    let fileType = "N/A";
    if (file.type) {
      fileType = file.type;
    } else {
      const fileNameParts = file.name.split(".");
      if (fileNameParts.length > 1) {
        fileType = fileNameParts[fileNameParts.length - 1];
      }
    }

    return { type: fileType };
  };

  return (
    <div className="md:grid md:grid-cols-10 gap-4 h-fit pt-4 pb-4 bg-[#1A2027] flex flex-col">
      {/* User Profile */}
      <div className="row-span-3 col-span-3 h-fit p-2 bg-[#222831] text-[#EEEEEE] rounded-md">
        <div className=" bg-[#00ADB5] rounded-md font-bold p-2 mb-2">
          <h1 className=" font-bold">User Profile</h1>
        </div>
        <div className="bg-[#393E46] p-2 rounded-md">
          <div className="mb-2">
            <p className="text-large font-bold">{user.fullName}</p>
          </div>

          <div className="flex items-center mb-2">
            <p className="flex items-center">
              <span className="mr-4">
                <img src={gmail} className="w-10 h-15" alt="Gmail" />
              </span>{" "}
              {user.Email}
            </p>
          </div>

          <div className="flex items-center mb-2">
            <p className="flex items-center">
              <span className="mr-4">
                <img src={aadhar} className="w-10 h-15" alt="Aadhar" />
              </span>
              {user.Aadhar}
            </p>
          </div>

          <div className="flex items-center mb-2">
            <p className="flex items-center">
              <span className="mr-4">
                <img src={phone} className="w-10 h-15" alt="Phone" />
              </span>
              {user.Telephone}
            </p>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="row-span-2 col-span-3 h-500 p-2 bg-[#222831] text-[#EEEEEE] font-bold">
        <div className=" bg-[#00ADB5] rounded-md font-bold p-2 mb-2">
          <h1 className=" font-bold">Documents List</h1>
        </div>
        <ul>
          {documentList.map((doc) => (
            <li
              key={doc._id}
              onClick={() => handleDocumentSelect(doc)}
              className=" cursor-pointer bg-[#393E46] p-2 rounded-md"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Document Preview */}
      {/* <div className="row-span-4 col-span-4 h-500 p-2 bg-[#222831] text-[#EEEEEE] font-bold">
        <div className=" bg-[#00ADB5] rounded-md font-bold p-2 mb-2">
          <h1 className=" font-bold">Document Preview</h1>
        </div>
        {selectedDocument && (
          <iframe
            src={selectedDocument.ipfsPath}
            title="Document Preview"
            width="100%"
            height="85%"
            style={{ border: "none" }}
            scrolling="auto"
          ></iframe>
        )}
      </div> */}

      <div className="row-span-4 col-span-4 h-500 p-2 bg-[#222831] text-[#EEEEEE] font-bold">
        <div className=" bg-[#00ADB5] rounded-md font-bold p-2 mb-2">
          <h1 className=" font-bold">Document Preview</h1>
        </div>
        {showPasswordInput && (
          <div className="text-center">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 mb-4 w-full border rounded"
            />
            <button
              onClick={handlePasswordSubmit}
              className="bg-[#00ADB5] text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}

        {selectedDocument && !showPasswordInput && (
          <iframe
            src={selectedDocument.ipfsPath}
            title="Document Preview"
            width="100%"
            height="85%"
            style={{ border: "none" }}
            scrolling="auto"
          ></iframe>
        )}
      </div>

      {/* Document Details */}
      <div className="row-span-2 col-span-3 h-500 p-2 bg-[#222831] text-[#EEEEEE] font-bold">
        <div className=" bg-[#00ADB5] rounded-md font-bold p-2 mb-2">
          <h1 className=" font-bold">Document Details</h1>
        </div>
        {selectedDocument && (
          <div className="bg-[#393E46] p-2 rounded-md">
            <p>Uploaded Date: {selectedDocument.uploadDatetime}</p>
            <p>Size: {selectedDocument.fileSizeKB} KB</p>
            <p>Type: {calculateFilType(selectedDocument).type}</p>
          </div>
        )}
      </div>

      {/* Approved Documents */}
      <div className="row-span-3 col-span-3 h-500 p-2 bg-[#222831] text-[#EEEEEE] ">
        <div className=" bg-[#00ADB5] rounded-md font-bold p-2 mb-2">
          <h1 className=" font-bold">Approved Documents</h1>
        </div>
        <ul>
          {approvedDocuments.map((doc) => (
            <li
              key={doc.documentId.aadhar} // Use a unique key
              onClick={() => handleDocumentSelect(doc.documentId)}
              className="cursor-pointer bg-[#393E46] p-2 rounded-md"
            >
              {doc.documentId.name} {/* Display document name */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetDoc;
