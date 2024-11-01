import React, { useEffect } from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-15">
      <div className="relative w-full h-full p-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="resume"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ResumeModal;
