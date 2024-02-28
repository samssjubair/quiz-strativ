"use client"

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAnswer, IQuestion } from "@/interfaces/global.interface";
import { timeAgo } from "@/utils/timeAgo";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const UserPanelPage = () => {
  const [questions, setQuestions] = useLocalStorage<IQuestion[]>(
    "adminQuestions",
    []
  );
  const [answers, setAnswers] = useLocalStorage<IAnswer[]>("userAnswers", []);
  const [isClient, setIsClient] = useState(false);
  const [inputValues, setInputValues] = useState<{ [qid: string]: string }>({});
  

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
        answeredBy: "User", // You can replace "User" with the actual user's name
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
        questions.map((question: IQuestion) => {
          const userAnswer = answers.find((a) => a.qid === question.qid);
          const inputValue = inputValues[question.qid] || "";
          return (
            <div key={question.qid} className="mb-4">
              <h2 className="text-lg font-semibold">{question.qname}</h2>
              {userAnswer ? (
                <>
                  <div>{userAnswer.answer}</div>
                  <div className="text-sm text-gray-500">
                    <span>Edited:</span>
                    {userAnswer.editHistory.map((history, index) => (
                      <div className="flex gap-4" key={index}>
                        <span>{history.answer}</span>
                        <span>{timeAgo(history.date)} </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const editedAnswer = prompt(
                        "Edit your answer:",
                        userAnswer.answer
                      );
                      if (editedAnswer !== null) {
                        editAnswer(question.qid, editedAnswer);
                      }
                    }}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    <AiFillEdit className="mr-1" />
                    Edit Answer
                  </button>
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) =>
                      handleInputChange(question.qid, e.target.value)
                    }
                    placeholder="Type your answer here..."
                    className="border border-gray-400 p-2 mr-2"
                  />
                  <button
                    onClick={() => {
                      if (inputValue.trim() !== "") {
                        submitAnswer(question.qid, inputValue);
                        setInputValues({
                          ...inputValues,
                          [question.qid]: "",
                        });
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default UserPanelPage;