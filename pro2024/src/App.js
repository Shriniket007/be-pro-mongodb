import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import ShareDoc from "./components/ShareDoc";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import UploadFile from "./components/UploadFile";
import Navbar1 from "./components/Navbar1";
import GetDoc from "./components/GetDoc";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { useSelector } from "react-redux";
import ChangePassword from "./components/ChangePassword";

function App() {
  const user = useSelector((state) => state.usersReducer.user);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#1A2027]">
        {" "}
        {/* Set the container to take at least the full height of the viewport */}
        <div className="flex-grow">
          {user ? <Navbar1 /> : <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/UploadFile" element={<UploadFile />} />
            <Route path="/get_docs" element={<GetDoc />} />
            <Route path="/share_docs" element={<ShareDoc />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Navbar1 from './components/Navbar1';
// import Home from './components/Home';
// import AboutUs from './components/AboutUs';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import UploadFile from './components/UploadFile';
// import Register from './components/Register';
// import ShareDoc from './components/ShareDoc';
// import GetDoc from './components/GetDoc';

// function App() {
//   const isLoggedIn = true;  // Set this dynamically based on user login status

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <div className="flex-grow">
//           {/* Conditionally render Navbar or Navbar1 based on login status */}
//           {isLoggedIn ? <Navbar1 /> : <Navbar />}

//           <Routes>
//             {/* Use a dynamic route for the Home page */}
//             <Route path="/" element={isLoggedIn ? <AboutUs /> : <Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/UploadFile" element={<UploadFile />} />
//             <Route path="/get_docs" element={<GetDoc />} />
//             <Route path="/share_docs" element={<ShareDoc />} />

//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
