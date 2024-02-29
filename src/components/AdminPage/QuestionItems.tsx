// QuestionItems.tsx
import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { IQuestion, IAnswer } from "@/interfaces/global.interface";

interface QuestionItemProps {
  question: IQuestion;
  answers: IAnswer[]; // Add answers prop
  onDelete: (qid: string) => void;
  onEdit: (qid: string, newQuestionText: string) => void;
  index: number;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answers,
  onDelete,
  onEdit,
  index,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question.qname);

  const handleSave = () => {
    onEdit(question.qid, editedQuestion);
    setEditMode(false);
  };
  // console.log(answers)
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h4>
            {index + 1}.&nbsp; {question.qname}
          </h4>
          <div className="ml-6 mt-2">
            <h3 className="font-bold mb-2">Answers:</h3>
            {answers.map((answer, i) => (
              <div key={i} className="bg-gray-200 p-2 mb-2 rounded-lg">
                <span>{answer.answeredBy}: </span>
                <span>{answer.answer}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={() => onDelete(question.qid)}>
            <RiDeleteBin6Line />
          </button>
          <button onClick={() => setEditMode(true)}>
            <RiEdit2Line />
          </button>
        </div>
      </div>
      {editMode && (
        <div className="mt-4">
          <textarea
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            className="border border-gray-200 p-2 rounded-lg w-full"
          />
          <button
            onClick={handleSave}
            className="bg-tertiary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
