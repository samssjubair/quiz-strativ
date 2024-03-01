"use client"
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  loginButton?: ReactNode; // Add loginButton prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  loginButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg mx-4 w-full md:w-1/2 lg:w-1/3">
        {children}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          {/* Render the loginButton prop if provided */}
          {loginButton && <div>{loginButton}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
