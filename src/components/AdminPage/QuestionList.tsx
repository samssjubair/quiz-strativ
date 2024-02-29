// QuestionList.tsx
import React from "react";
import { IQuestion, IAnswer } from "@/interfaces/global.interface";
import { QuestionItem } from "./QuestionItems";

interface QuestionListProps {
  questions: IQuestion[];
  answers: IAnswer[]; // Add answers prop
  onDelete: (qid: string) => void;
  onEdit: (qid: string, newQuestionText: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  answers,
  onDelete,
  onEdit,
}) => {
  console.log(answers, "a");
  return (
    <div>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.qid}
          index={index}
          question={question}
          answers={answers.filter((answer) => answer.qid === question.qid)} // Filter answers by question id
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
