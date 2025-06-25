// ContactPage.jsx
import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-15">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have questions or need help? Reach out to us using the information below or fill out our contact form.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-2">Our Office</h2>
          <p className="text-gray-700">
            302, Sunrise Complex,<br />
            Ring Road, Surat, Gujarat - 395002<br />
            India
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Contact Information</h2>
          <p className="text-gray-700">Phone: +91 98765 43210</p>
          <p className="text-gray-700">Email: support@yourcompany.com</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Your Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full border px-3 py-2 rounded"
              placeholder="Write your message"
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
