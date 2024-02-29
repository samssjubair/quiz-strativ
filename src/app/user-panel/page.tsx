"use client";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAnswer, IQuestion } from "@/interfaces/global.interface";
import QuestionContainer from "@/components/UserPage/QuestionContainer";
import { useSession } from "next-auth/react";

const UserPanelPage = () => {
  const [questions, setQuestions] = useLocalStorage<IQuestion[]>(
    "adminQuestions",
    []
  );
  const { data: session } = useSession();
  const [answers, setAnswers] = useLocalStorage<IAnswer[]>("userAnswers", []);
  const [isClient, setIsClient] = useState(false);
  const [inputValues, setInputValues] = useState<{ [qid: string]: string }>({});
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitAnswer = (qid: string, answer: string) => {
    const answeredBy = session?.user?.name || "Anonymous";
    const existingAnswerIndex = answers.findIndex((a) => a.qid === qid);
    if (existingAnswerIndex !== -1) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...answers[existingAnswerIndex],
        answer,
        answeredBy,
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
        answeredBy,
        editHistory: [{ date: new Date().toISOString(), answer }],
      };
      setAnswers([...answers, newAnswer]);
    }
  };

  const editAnswer = (qid: string, editedAnswer: string) => {
    const answeredBy = session?.user?.name || "Anonymous";
    const existingAnswerIndex = answers.findIndex((a) => a.qid === qid);
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...answers[existingAnswerIndex],
        answer: editedAnswer,
        answeredBy,
        editHistory: [
          ...answers[existingAnswerIndex].editHistory,
          { date: new Date().toISOString(), answer: editedAnswer },
        ],
      };
      setAnswers(updatedAnswers);
      setEditingAnswerId(null);
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
    <div className="px-4 w-full md:w-1/3 lg:w-1/2  mx-auto">
      <h1 className="text-2xl font-bold mt-6 text-center uppercase text-white">
        User Panel
      </h1>
      {isClient &&
        questions.map((question: IQuestion, index: number) => {
          const userAnswers = answers.filter(
            (answer) => answer.answeredBy === session?.user?.name
          );

          return (
            <QuestionContainer
              index={index}
              key={question.qid}
              question={question}
              answers={userAnswers}
              inputValues={inputValues}
              editingAnswerId={editingAnswerId}
              setEditingAnswerId={setEditingAnswerId}
              handleInputChange={handleInputChange}
              submitAnswer={submitAnswer}
              editAnswer={editAnswer}
            />
          );
        })}
    </div>
  );
};

export default UserPanelPage;
