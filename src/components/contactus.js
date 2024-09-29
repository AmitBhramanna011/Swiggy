import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    user_email: "",
    message: "",
  });
  const [formVisible, setFormVisible] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state to true

    emailjs
      .send(
        "service_e52qcka",  // Replace with your EmailJS service ID
        "template_mcr0adg", // Replace with your EmailJS template ID
        formData,
        "KQnwNs4_2emPK0pBs" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Email successfully sent:", result.text);
          setIsSent(true); // Show success message
          setFormVisible(false); // Hide the form
          setTimeout(() => {
            setIsSent(false); // Hide success message
            setFormVisible(true); // Show the form again
            setFormData({ from_name: "", user_email: "", message: "" }); // Clear form fields
          }, 3000); // Show for 3 seconds
        },
        (error) => {
          console.error("Error in sending email:", error);
          alert("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Form</h2>

      {isSent && (
        <div className="mb-4">
          <button
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Message Sent!
          </button>
        </div>
      )}
      {formVisible && (
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ height: '150px' }} 
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading} // Disable the button while loading
              className={`w-full ${isLoading ? "bg-gray-400" : "bg-orange-500"} text-white font-bold py-2 px-4 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {isLoading ? "Sending..." : "Send Message"} {/* Show loading text */}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
