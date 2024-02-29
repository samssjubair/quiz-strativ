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
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Type your answer here..."
        className="border text-black border-gray-400 p-2 mr-2"
      />
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            submitAnswer(questionId, inputValue);
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default AnswerInput;
