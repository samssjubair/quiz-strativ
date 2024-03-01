import { showToast } from "@/utils/showToast";
import React from "react";
import Button from "../Ui/Button";

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
  const handleInputSubmit = () => {
    showToast("Answer submitted", "success");
    if (inputValue.trim() !== "") {
      submitAnswer(questionId, inputValue);
    }
  };

  return (
    <div className="bg-gray-900 m-4 rounded-lg p-4 shadow-lg text-white flex flex-wrap">
      <textarea
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Type your answer here..."
        className="border text-white w-full border-gray-400 p-2 mr-2 rounded-lg bg-gray-800"
      />
      <Button label="Submit Answer" onClick={handleInputSubmit} type="primary" className="mt-2" />
    </div>
  );
};

export default AnswerInput;
