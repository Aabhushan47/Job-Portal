import React, { useEffect, useRef } from "react";

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      onClick={closeModal}
    >
      {children}
    </div>
  );
};

export default Modal;
