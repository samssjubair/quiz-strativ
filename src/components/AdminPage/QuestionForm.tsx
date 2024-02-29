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
    <div className="mb-6 flex flex-col items-start gap-2">
      <textarea
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Add a new question"
        className="border bg-primary text-white border-gray-400 rounded w-full p-2  flex-grow"
      />
      <button
        onClick={addQuestion}
        className="bg-tertiary border-gray-600 border text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </div>
  );
};
