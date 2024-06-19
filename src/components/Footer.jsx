import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;