// AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-15">
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>

      <p className="text-gray-700 mb-4">
        Welcome to <strong>YourCompany</strong>, your one-stop solution for all things related to online shopping.
        Our mission is to provide customers with high-quality products at affordable prices, delivered quickly and efficiently.
      </p>

      <p className="text-gray-700 mb-4">
        Founded in 2023 in Surat, Gujarat, we started as a small startup with a vision to transform e-commerce for everyone.
        With a team of passionate developers, marketers, and designers, we strive to make your shopping experience seamless.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
      <p className="text-gray-700 mb-4">
        To become India’s most customer-centric company, where people can find and discover anything they might want to buy online.
        We aim to empower local vendors and build a strong online retail ecosystem.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Fast & secure delivery across India</li>
        <li>Quality-checked products from trusted sellers</li>
        <li>24/7 customer support</li>
        <li>Easy returns & exchanges</li>
        <li>Multiple secure payment options</li>
      </ul>

      <p className="mt-6 text-gray-700">
        Thank you for choosing YourCompany. We are committed to serving you better every day!
      </p>
    </div>
  );
};

export default AboutPage;
