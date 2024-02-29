import { IQuestion } from "@/interfaces/global.interface";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

interface QuestionItemProps {
  question: IQuestion;
  onDelete: (qid: string) => void;
  onEdit: (qid: string, newQuestionText: string) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onDelete,
  onEdit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question.qname);

  const handleSave = () => {
    onEdit(question.qid, editedQuestion);
    setEditMode(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-4">
      {editMode ? (
        <>
          <input
            type="text"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            className="border border-gray-400 p-2 mr-2 flex-grow"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className="flex-grow">{question.qname}</span>
          <button onClick={() => onDelete(question.qid)} className="ml-2">
            <RiDeleteBin6Line />
          </button>
          <button onClick={() => setEditMode(true)} className="ml-2">
            <RiEdit2Line />
          </button>
        </>
      )}
    </div>
  );
};
