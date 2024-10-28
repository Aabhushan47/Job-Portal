import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly">
        <div className="max-w-xs mx-auto md:mx-0 py-4">
          <h4 className="text-xl mb-2">About Us</h4>
          <p>
            Learn more about our company and our mission to help job seekers
            find their dream jobs.
          </p>
        </div>
        <div className="max-w-xs mx-auto md:mx-0 py-4">
          <h4 className="text-xl mb-2">Contact</h4>
          <p>Email: burninglykfire98@gmail.com</p>
          <p>Phone: +977-9861785683</p>
        </div>
        <div className="max-w-xs mx-auto md:mx-0 py-4">
          <h4 className="text-xl mb-2">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-5">
            <a href="https://www.facebook.com/aabushan.khanal/">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.instagram.com/_its_aabu/">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://twitter.com/Aabhush19236306">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/aabhushan-khanal-0a7595273/">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 pt-3 mt-4">
        <p>&copy; 2024 JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
