"use client"
import { showToast } from "@/utils/showToast";
import { useState } from "react";

interface EditAnswerProps {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

const EditAnswer: React.FC<EditAnswerProps> = ({
  initialValue,
  onSave,
  onCancel,
}) => {
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleSave = () => {
    showToast("Answer updated", "success");
    onSave(editedValue);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="bg-white p-4 border rounded-md">
      <input
        type="text"
        value={editedValue}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-2"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 mr-2 rounded-md"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditAnswer;
