import { IQuestion } from "@/interfaces/global.interface";
import { QuestionItem } from "./QuestionItems";

interface QuestionListProps {
  questions: IQuestion[];
  onDelete: (qid: string) => void;
  onEdit: (qid: string, newQuestionText: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionItem
          key={question.qid}
          question={question}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
