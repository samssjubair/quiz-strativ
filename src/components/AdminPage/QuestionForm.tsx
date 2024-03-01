import { useState } from "react";
import Button from "../Ui/Button";
import { showToast } from "@/utils/showToast";

export const QuestionForm: React.FC<{ onSubmit: (newQuestion: string) => void }> = ({
  onSubmit,
}) => {
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    showToast("Question added", "success");
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
      <Button label="Add" onClick={addQuestion} type="tertiary" />
    </div>
  );
};
