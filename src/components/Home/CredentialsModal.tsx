// components/CredentialsModal.tsx
import React from "react";
import Modal from "../Ui/Modal";
import { signIn } from "next-auth/react";

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CredentialsModal: React.FC<CredentialsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      loginButton={
        <button
          className="px-4 py-2 bg-primary text-white rounded-md mr-2 hover:bg-primary-dark"
          onClick={() => signIn()}
        >
          Go to Login
        </button>
      }
    >
      <h2 className="text-lg font-bold mb-4">Demo Credentials</h2>
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-1">Admin:</h3>
        <p>Mail: admin@gmail.com</p>
        <p>Password: 1234</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-1">User 1:</h3>
        <p>Mail: samss@gmail.com</p>
        <p>Password: 1234</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-1">User 2:</h3>
        <p>Mail: messi@gmail.com</p>
        <p>Password: 1234</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-1">User 3:</h3>
        <p>Mail: mscott@gmail.com</p>
        <p>Password: 1234</p>
      </div>
      {/* <div className="mt-4 flex justify-end">
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-primary text-white rounded-md mr-2 hover:bg-primary-dark"
        >
          Go to Login
        </button>
      </div> */}
    </Modal>
  );
};

export default CredentialsModal;
