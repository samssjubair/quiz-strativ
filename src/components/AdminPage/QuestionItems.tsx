// QuestionItems.tsx
import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { IQuestion, IAnswer } from "@/interfaces/global.interface";
import { timeAgo } from "@/utils/timeAgo";
import { FaUser } from "react-icons/fa";
import Button from "../Ui/Button";
import { showToast } from "@/utils/showToast";

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
    showToast("Question updated", "success");
    onEdit(question.qid, editedQuestion);
    setEditMode(false);
  };
  // console.log(answers)
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 mb-4 hover:shadow-lg hover:shadow-gray-500">
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold">
            {index + 1}.&nbsp; {question.qname}
          </h4>
        </div>
        <div className="mt-2">
          <button
            title="Delete question"
            className="me-2"
            onClick={() => onDelete(question.qid)}
          >
            <RiDeleteBin6Line />
          </button>
          <button title="Edit question" onClick={() => setEditMode(true)}>
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
          <Button label="Save" onClick={handleSave} type="tertiary" />
        </div>
      )}
      <div className=" mt-2">
        {!!answers.length && <h3 className="font-bold my-1">Answers:</h3>}
        {answers.map((answer, i) => (
          <div key={i} className="bg-gray-200 p-2 mb-2 rounded-lg">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <FaUser className="avatar" />
                <div className="flex flex-col items-start">
                  <span className="font-bold text-primary">
                    {answer.answeredBy}{" "}
                  </span>
                  <span>{answer.answer}</span>
                </div>
              </div>
              <span className="text-gray-500 text-sm ">
                {timeAgo(answer.editHistory[0].date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
