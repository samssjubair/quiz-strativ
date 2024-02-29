import React from "react";
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
  return (
    <>
      <div>{userAnswer.answer}</div>
      <div className="text-sm text-gray-500">
        <span>Edit History:</span>
        {userAnswer.editHistory.map((history, index) => (
          <div className="flex gap-4" key={index}>
            <span>{history.answer}</span>
            <span>{timeAgo(history.date)} </span>
          </div>
        ))}
      </div>
      {editingAnswerId === questionId ? (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value, questionId)}
            placeholder="Type your edited answer here..."
            className="border text-black border-gray-400 p-2 mr-2"
          />
          <button
            onClick={() => {
              if (inputValue.trim() !== "") {
                editAnswer(questionId, inputValue);
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Edit
          </button>
        </>
      ) : (
        <button
          onClick={() => setEditingAnswerId(questionId)}
          className="text-blue-500 hover:underline flex items-center"
        >
          <AiFillEdit className="mr-1" />
          Edit Answer
        </button>
      )}
    </>
  );
};

export default AnswerDisplay;
