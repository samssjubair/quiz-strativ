"use client"
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAnswer, IQuestion } from "@/interfaces/global.interface";
import QuestionContainer from "@/components/UserPage/QuestionContainer";

const UserPanelPage = () => {
  const [questions, setQuestions] = useLocalStorage<IQuestion[]>(
    "adminQuestions",
    []
  );
  const [answers, setAnswers] = useLocalStorage<IAnswer[]>("userAnswers", []);
  const [isClient, setIsClient] = useState(false);
  const [inputValues, setInputValues] = useState<{ [qid: string]: string }>({});
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitAnswer = (qid: string, answer: string) => {
    const existingAnswerIndex = answers.findIndex((a) => a.qid === qid);
    if (existingAnswerIndex !== -1) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...answers[existingAnswerIndex],
        answer,
        editHistory: [
          ...answers[existingAnswerIndex].editHistory,
          { date: new Date().toISOString(), answer },
        ],
      };
      setAnswers(updatedAnswers);
    } else {
      // Add new answer
      const newAnswer: IAnswer = {
        answerId: generateAnswerId(),
        qid,
        answer,
        answeredBy: "User",
        editHistory: [{ date: new Date().toISOString(), answer }],
      };
      setAnswers([...answers, newAnswer]);
    }
  };

  const editAnswer = (qid: string, editedAnswer: string) => {
    const existingAnswerIndex = answers.findIndex((a) => a.qid === qid);
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...answers[existingAnswerIndex],
        answer: editedAnswer,
        editHistory: [
          ...answers[existingAnswerIndex].editHistory,
          { date: new Date().toISOString(), answer: editedAnswer },
        ],
      };
      setAnswers(updatedAnswers);
      setEditingAnswerId(null); // Clear editing state after edit
    }
  };

  const generateAnswerId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleInputChange = (qid: string, value: string) => {
    setInputValues({
      ...inputValues,
      [qid]: value,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Panel</h1>
      {isClient &&
        questions.map((question: IQuestion) => (
          <QuestionContainer
            key={question.qid}
            question={question}
            answers={answers}
            inputValues={inputValues}
            editingAnswerId={editingAnswerId}
            setEditingAnswerId={setEditingAnswerId}
            handleInputChange={handleInputChange}
            submitAnswer={submitAnswer}
            editAnswer={editAnswer}
          />
        ))}
    </div>
  );
};

export default UserPanelPage;
