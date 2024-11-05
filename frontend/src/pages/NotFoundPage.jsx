import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <h1>
          Unfortunately the page you are looking for has been moved or deleted!
        </h1>
        <Link
          className="bg-blue-500 w-36 flex justify-center items-center text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 transition duration-200"
          to="/"
        >
          Back To Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
