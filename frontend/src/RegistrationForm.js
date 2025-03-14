import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone); // Ensures exactly 10 digits (no letters or special characters)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setMessage("All fields are required.");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert("Enter valid phone number");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", formData);
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setMessage("Error submitting form. Try again.");
    }
  };

  return (
    <div>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
