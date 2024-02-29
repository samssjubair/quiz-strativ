import { useState } from "react";

export const QuestionForm: React.FC<{ onSubmit: (newQuestion: string) => void }> = ({
  onSubmit,
}) => {
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      onSubmit(newQuestion);
      setNewQuestion("");
    }
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Enter your question"
        className="border border-gray-400 p-2 mr-2 flex-grow"
      />
      <button
        onClick={addQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Question
      </button>
    </div>
  );
};
