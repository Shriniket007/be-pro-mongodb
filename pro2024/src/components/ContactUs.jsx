import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    subject: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = { ...errors };

    if (!/^[a-zA-Z\s]*$/.test(formData.fullName)) {
      formValid = false;
      newErrors.fullName = "Name must contain letters only";
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(formData.email.toLowerCase())) {
      formValid = false;
      newErrors.email = "Invalid email address";
    }

    if (formData.subject.trim() === "") {
      formValid = false;
      newErrors.subject = "Subject is required";
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      formValid = false;
      newErrors.phoneNumber = "Phone Number must contain numbers only";
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xeqyqnwj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form submitted successfully, reset form fields
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          phoneNumber: "",
        });

        // Reset validation errors
        setErrors({
          fullName: "",
          email: "",
          subject: "",
          phoneNumber: "",
        });

        alert("Form submitted successfully!");
      } else {
        alert("Error submitting the form. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting the form. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex h-screen mx-4">
        <div className="w-1/2 bg-gray-800 flex flex-col items-center justify-center p-8">
          <h2 className="text-6xl font-bold text-blue-400 mb-8">Contact Us</h2>
          <p className="text-gray-300 text-center">
            "Contact us for any inquiries, assistance, or collaboration
            opportunities. We value your feedback and are here to address your
            queries promptly. Fill out the form with your details, and our team
            will get back to you as soon as possible. Whether you have questions
            about our services, want to discuss partnerships, or simply wish to
            connect, we look forward to hearing from you. Your communication is
            important to us, and we strive to provide the best support for your
            needs.
          </p>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-4 bg-gray-800 shadow-md border rounded"
          >
            <h2 className="text-2xl font-bold mb-8 text-teal-500 text-center">Contact Us</h2>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-100 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                } rounded bg-gray-200`}
                required
                pattern="^[a-zA-Z\s]*$"
                title="Name must contain letters only"
              />
              {errors.fullName && (
                <p className="text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-100 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded bg-gray-200`}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Invalid email address"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-100 font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                } rounded bg-gray-200`}
                required
              />
              {errors.subject && (
                <p className="text-red-500 mt-1">{errors.subject}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-100 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-500"
                } rounded bg-gray-200`}
                required
                pattern="^\d+$"
                title="Phone Number must contain numbers only"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
