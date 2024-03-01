import React from "react";

interface AnswerInputProps {
  inputValue: string;
  handleInputChange: (value: string) => void;
  questionId: string;
  submitAnswer: (qid: string, answer: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  inputValue,
  handleInputChange,
  questionId,
  submitAnswer,
}) => {
  return (
    <div className="bg-gray-900 m-4 rounded-lg p-4 shadow-lg text-white flex flex-wrap">
      <textarea
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Type your answer here..."
        className="border text-white w-full border-gray-400 p-2 mr-2 rounded-lg bg-gray-800"
      />
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            submitAnswer(questionId, inputValue);
          }
        }}
        className="bg-blue-500 mt-2 min-w-40 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default AnswerInput;
