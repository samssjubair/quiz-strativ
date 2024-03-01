import React from "react";
import { IQuestion, IAnswer } from "@/interfaces/global.interface";
import AnswerDisplay from "./AnswerDisplay";
import AnswerInput from "./AnswerInput";

interface QuestionContainerProps {
  index: number;
  question: IQuestion;
  answers: IAnswer[];
  inputValues: { [qid: string]: string };
  editingAnswerId: string | null;
  setEditingAnswerId: React.Dispatch<React.SetStateAction<string | null>>;
  handleInputChange: (qid: string, value: string) => void;
  submitAnswer: (qid: string, answer: string) => void;
  editAnswer: (qid: string, editedAnswer: string) => void;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  index,
  question,
  answers,
  inputValues,
  editingAnswerId,
  setEditingAnswerId,
  handleInputChange,
  submitAnswer,
  editAnswer,
}) => {
  const userAnswer = answers.find((a) => a.qid === question.qid);
  const inputValue = inputValues[question.qid] || "";

  return (
    <div className="mb-2 text-white p-4 mt-6 rounded hover:shadow-lg hover:shadow-sky-900">
      <h2 className="text-lg ms-2 font-semibold">
        {index + 1}. {question.qname}
      </h2>
      {userAnswer ? (
        <AnswerDisplay
          userAnswer={userAnswer}
          editingAnswerId={editingAnswerId}
          inputValue={inputValue}
          handleInputChange={(value: any) =>
            handleInputChange(question.qid, value)
          }
          questionId={question.qid}
          setEditingAnswerId={setEditingAnswerId}
          editAnswer={editAnswer}
        />
      ) : (
        <AnswerInput
          inputValue={inputValue}
          handleInputChange={(value: any) =>
            handleInputChange(question.qid, value)
          }
          questionId={question.qid}
          submitAnswer={submitAnswer}
        />
      )}
    </div>
  );
};

export default QuestionContainer;
