import React, { useState } from "react";
import { timeAgo } from "@/utils/timeAgo";
import { AiFillEdit } from "react-icons/ai";

interface AnswerDisplayProps {
  userAnswer: {
    answer: string;
    editHistory: { answer: string; date: string }[];
  };
  editingAnswerId: string | null;
  inputValue: string;
  handleInputChange: (value: string, questionId: string) => void;
  questionId: string;
  setEditingAnswerId: (id: string | null) => void;
  editAnswer: (qid: string, editedAnswer: string) => void;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
  userAnswer,
  editingAnswerId,
  inputValue,
  handleInputChange,
  questionId,
  setEditingAnswerId,
  editAnswer,
}) => {
  const [showEditHistory, setShowEditHistory] = useState(false);

  const toggleEditHistory = () => {
    setShowEditHistory((prevState) => !prevState);
  };

  return (
    <div className="bg-secondary m-4 rounded-lg p-4 shadow-lg text-white">
      <div className="mb-4">Your answer: {userAnswer.answer}</div>
      <div className="text-sm text-gray-500">
        <button
          className="text-white  hover:underline my-2"
          onClick={toggleEditHistory}
        >
          {showEditHistory ? "Hide Edit History" : "View Edit History"}
        </button>
        <br />
        {showEditHistory && (
          <div className="mb-4">
            <span className="font-bold text-gray-300 inline-block mt-2">Edit History:</span>
            {userAnswer.editHistory.map((history, index) => (
              <div className="flex gap-4 text-gray-300 my-1 justify-between" key={index}>
                <span>{history.answer}</span>
                <span className="text-gray-400">{timeAgo(history.date)} </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {editingAnswerId === questionId ? (
        <div className="">
          <textarea
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value, questionId)}
            placeholder="Type your answer"
            className="border w-full border-gray-400 text-white p-2 mr-2 rounded-lg bg-gray-800"
          />
          <button
            onClick={() => {
              if (inputValue.trim() !== "") {
                editAnswer(questionId, inputValue);
              }
            }}
            className="bg-primary hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit Edit
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditingAnswerId(questionId)}
          className="text-gray-300 mt-4 hover:underline flex items-center"
        >
          <AiFillEdit className="mr-1" />
          Edit Answer
        </button>
      )}
    </div>
  );
};

export default AnswerDisplay;
